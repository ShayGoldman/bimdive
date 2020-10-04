import { APIGatewayProxyEvent } from "aws-lambda";
import { Context } from "../../services/context.service";
import jsonwebtoken from "jsonwebtoken";

export const $MetabaseEmbedding = ({
  context,
  secret,
}: {
  context: Context;
  secret: string;
}) => {
  return async function metabaseEmbedding({
    event,
  }: {
    event: APIGatewayProxyEvent;
  }) {
    const { logger } = context;

    const { questionId, params = {} } = JSON.parse(event.body || "{}");

    logger.info({
      msg: "generating embed link",
      questionId,
    });

    const payload = {
      resource: { question: questionId },
      params,
      exp: Math.round(Date.now() / 1000) + 60 * 60, // one hour
    };
    var token = jsonwebtoken.sign(payload, secret);

    const url =
      "https://metabase.bimdive.com/embed/question/" +
      token +
      "#bordered=true&titled=true";

    return {
      data: {
        url,
      },
    };
  };
};
