import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context as APIGatewayContext,
} from "aws-lambda";
import { $Context, Context } from "../../services/context.service";
import { error, success, redirect } from "../../utils/api-gateway-result";

type HandlerParams = { event: APIGatewayProxyEvent };

type HandlerResult = {
  data?: string | number | object | null;
  redirect?: string;
  error?: string;
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
        const {
          path,
          httpMethod: method,
          queryStringParameters,
          multiValueQueryStringParameters,
        } = event;

        logger.info({
          msg: "request recieved",
          path,
          requestId,
          method,
          environment,
          queryStringParameters,
          multiValueQueryStringParameters,
        });

        let response = error("Unknown error");

        try {
          const {
            data,
            redirect: redirectUrl,
            error: errorText,
          } = await handler({ event });
          logger.info({
            msg: "request handled",
            requestId,
          });

          if (errorText) {
            response = error(errorText || "Unknown error");
          }

          if (redirectUrl) {
            response = redirect(redirectUrl);
          }

          return success(data);
        } catch (err) {
          logger.error({
            msg: "error encountered",
            requestId,
            ...err,
          });
          response = error(err.message || "Unknown error");
        } finally {
          await context.hooks.onShutdown();
        }

        return response;
      };
    },
  };
};
