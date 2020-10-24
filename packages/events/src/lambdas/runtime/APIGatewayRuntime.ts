import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context as APIGatewayContext,
} from "aws-lambda";
import { $Context, Context } from "../../services/context.service";
import { error, redirect, success } from "../../utils/api-gateway-result";

type HandlerParams = { event: APIGatewayProxyEvent };

type HandlerResult = {
  data?: string | number | object | null;
  redirect?: string;
};

type Handler = (params: HandlerParams) => Promise<HandlerResult>;

type RuntimeDeps = {
  apiContext: APIGatewayContext;
  factory: () => Handler;
};

export type APIGatewayRuntime = (
  params: HandlerParams
) => Promise<APIGatewayProxyResult>;

const $Runtime = ({
  requestId,
  context,
  handler,
}: {
  requestId: string;
  context: Context;
  handler: Handler;
}) => {
  const apiGatewayRuntime: APIGatewayRuntime = async ({
    event,
  }: HandlerParams) => {
    const { logger, environment } = context;
    const {
      path,
      httpMethod: method,
      queryStringParameters,
      multiValueQueryStringParameters,
    } = event;

    logger.context({
      path,
      requestId,
      method,
      environment,
      queryStringParameters,
      multiValueQueryStringParameters,
    });

    try {
      const { data, redirect: redirectUrl } = await handler({
        event,
      });
      logger.info({
        msg: "request handled",
      });

      if (redirectUrl) {
        logger.info({
          msg: "redirecting",
          redirectUrl,
        });
        return redirect(redirectUrl);
      }

      return success(data);
    } catch (err) {
      logger.error({
        msg: "error encountered",
        err,
      });
      return error(err.message || "Unknown error");
    }
  };

  return apiGatewayRuntime;
};

export const $APIGatewayRuntimeFactory = (): {
  create: (deps: RuntimeDeps) => APIGatewayRuntime;
} => {
  const context = $Context();

  return {
    create: ({ apiContext, factory }: RuntimeDeps) => {
      apiContext.callbackWaitsForEmptyEventLoop = false;
      const handler = factory();

      return $Runtime({
        requestId: apiContext.awsRequestId,
        context,
        handler,
      });
    },
  };
};
