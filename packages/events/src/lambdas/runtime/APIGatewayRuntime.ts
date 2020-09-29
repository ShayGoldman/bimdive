import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context as APIGatewayContext,
} from "aws-lambda";
import { Context } from "../../services/context.service";
import { error, success } from "../../utils/api-gateway-result";

type Params = {
  event: APIGatewayProxyEvent;
  handler: (params: {
    event: APIGatewayProxyEvent;
  }) => Promise<string | number | object>;
};

export type APIGatewayRuntime = (
  params: Params
) => Promise<APIGatewayProxyResult>;

export const $APIGatewayRuntime = ({
  context,
  apiContext,
}: {
  context: Context;
  apiContext: APIGatewayContext;
}): APIGatewayRuntime => {
  return async function apiGatewayRuntime({ event, handler }: Params) {
    const { logger } = context;
    const requestId = apiContext.awsRequestId;
    const { path, httpMethod: method } = event;

    logger.info({
      msg: "request recieved",
      path,
      requestId,
      method,
    });

    try {
      const result = await handler({ event });
      logger.info({
        msg: "request handled",
        requestId,
      });
      return success(result);
    } catch (err) {
      logger.error({
        msg: "error encountered",
        requestId,
        ...err,
      });
      return error(err.message || "Unknown error");
    }
  };
};
