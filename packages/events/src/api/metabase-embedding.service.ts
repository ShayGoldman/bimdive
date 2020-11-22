import { APIGatewayProxyEvent } from "aws-lambda";
import { Context } from "../services/context.service";
import jsonwebtoken from "jsonwebtoken";

export const $MetabaseEmbedding = ({
  context,
  secret,
}: {
  context: Context;
  secret: string;
}) => {
  function getRequestParams({
    dashboardId,
    questionId,
  }: {
    dashboardId: string;
    questionId: string;
  }): { resource: object; baseUrl: string } {
    const resource = dashboardId
      ? { dashboard: dashboardId }
      : { question: questionId };
    const baseUrl = `https://metabase.bimdive.com/embed/${
      dashboardId ? "dashboard" : "question"
    }/`;

    return { baseUrl, resource };
  }

  return async function metabaseEmbedding({
    event,
  }: {
    event: APIGatewayProxyEvent;
  }) {
    const { logger } = context;

    const { questionId, dashboardId, params = {} } = JSON.parse(
      event.body || "{}"
    );

    logger.info({
      msg: "generating embed link",
      questionId,
      dashboardId,
    });

    const { resource, baseUrl } = getRequestParams({ dashboardId, questionId });

    const payload = {
      resource,
      params,
      exp: Math.round(Date.now() / 1000) + 60 * 60, // one hour
    };
    var token = jsonwebtoken.sign(payload, secret);

    const url = baseUrl + token + "#bordered=true&titled=true";

    return {
      data: {
        url,
      },
    };
  };
};
