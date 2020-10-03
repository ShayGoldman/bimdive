import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context as APIGatewayContext,
} from "aws-lambda";
import { $Context, Context } from "../../services/context.service";
import { error, success, redirect } from "../../utils/api-gateway-result";

type HandlerParams = { event: APIGatewayProxyEvent };

type HandlerResult = {
  data: string | number | object;
  redirect?: string;
};

type Handler = (params: HandlerParams) => Promise<HandlerResult>;

type Deps = {
  apiContext: APIGatewayContext;
  factory: (params: { context: Context }) => Handler;
};

export type APIGatewayRuntime = (
  params: HandlerParams
) => Promise<APIGatewayProxyResult>;

export const $APIGatewayRuntimeFactory = (): {
  create: (deps: Deps) => Promise<APIGatewayRuntime>;
} => {
  const contextPromise = $Context();

  return {
    create: async ({ apiContext, factory }: Deps) => {
      const context = await contextPromise;

      const { logger, environment } = context;
      const handler = factory({ context });

      return async function apiGatewayRuntime({ event }: HandlerParams) {
        const requestId = apiContext.awsRequestId;
        const { path, httpMethod: method } = event;

        logger.info({
          msg: "request recieved",
          path,
          requestId,
          method,
          environment,
        });

        try {
          const { data, redirect: redirectUrl } = await handler({ event });
          logger.info({
            msg: "request handled",
            requestId,
          });
          if (redirectUrl) {
            return redirect(redirectUrl);
          }
          return success(data);
        } catch (err) {
          logger.error({
            msg: "error encountered",
            requestId,
            ...err,
          });
          return error(err.message || "Unknown error");
        }
      };
    },
  };
};
