import { APIGatewayProxyEvent } from "aws-lambda";
import { Context } from "../services/context.service";

export const $GraphQL = ({ context }: { context: Context }) => {
  return async function graphql({ event }: { event: APIGatewayProxyEvent }) {
    const { logger } = context;

    logger.info(event);

    return { data: { foo: "bar" } };
  };
};
