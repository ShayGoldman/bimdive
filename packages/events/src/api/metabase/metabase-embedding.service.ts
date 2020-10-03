import { APIGatewayProxyEvent } from "aws-lambda";
import { Context } from "../../services/context.service";

export const $MetabaseEmbedding = ({ context }: { context: Context }) => {
  return async function metabaseEmbedding({
    event,
  }: {
    event: APIGatewayProxyEvent;
  }) {
    const { logger } = context;

    logger.info(event);

    return { data: { foo: "bar" } };
  };
};
