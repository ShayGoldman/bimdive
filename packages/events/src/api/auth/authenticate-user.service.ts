import { APIGatewayProxyEvent } from "aws-lambda";
import { Context } from "../../services/context.service";

export const $AuthenticateUser = ({ context }: { context: Context }) => {
  return async function authenticateUser({
    event,
  }: {
    event: APIGatewayProxyEvent;
  }) {
    const { logger } = context;

    const code = event.queryStringParameters?.code || "";

    logger.info(event);

    logger.debug({
      msg: "user authentication code found",
      code,
    });

    return { data: { foo: "bar" } };
  };
};
