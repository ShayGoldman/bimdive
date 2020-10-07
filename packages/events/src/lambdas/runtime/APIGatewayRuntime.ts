import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context as APIGatewayContext,
} from "aws-lambda";
import { $Context, Context } from "../../services/context.service";
import { $ServiceProvider, Services } from "../../services/service-provider";
import { error, success, redirect } from "../../utils/api-gateway-result";

type HandlerParams = { event: APIGatewayProxyEvent };

type HandlerResult = {
  data?: string | number | object | null;
  redirect?: string;
  error?: string;
};

type Handler = (params: HandlerParams) => Promise<HandlerResult>;

type MinimalRuntimeDeps = {
  apiContext: APIGatewayContext;
  factory: (params: { context: Context }) => Handler;
};

type RuntimeDeps = {
  apiContext: APIGatewayContext;
  factory: (params: { context: Context; services: Services }) => Handler;
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

    logger.info({
      msg: "request recieved",
      path,
      requestId,
      method,
      environment,
      queryStringParameters,
      multiValueQueryStringParameters,
    });

    try {
      const { data, redirect: redirectUrl, error: errorText } = await handler({
        event,
      });
      logger.info({
        msg: "request handled",
        requestId,
      });

      if (errorText) {
        return error(errorText || "Unknown error");
      }

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

  return apiGatewayRuntime;
};

export const $APIGatewayRuntimeFactory = (): {
  createMinimal: (deps: MinimalRuntimeDeps) => APIGatewayRuntime;
  create: (deps: RuntimeDeps) => Promise<APIGatewayRuntime>;
} => {
  const context = $Context();

  return {
    createMinimal: ({ apiContext, factory }: MinimalRuntimeDeps) => {
      apiContext.callbackWaitsForEmptyEventLoop = false;
      const handler = factory({ context });

      return $Runtime({
        requestId: apiContext.awsRequestId,
        context,
        handler,
      });
    },
    create: async ({ apiContext, factory }: RuntimeDeps) => {
      apiContext.callbackWaitsForEmptyEventLoop = false;
      const services = await $ServiceProvider({ context });
      const handler = factory({ context, services });

      return $Runtime({
        requestId: apiContext.awsRequestId,
        context,
        handler,
      });
    },
  };
};
