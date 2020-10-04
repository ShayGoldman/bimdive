import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  Context as APIGatewayContext,
} from "aws-lambda";
import { $MetabaseEmbedding } from "../../api/metabase/metabase-embedding.service";
import { getFromEnv } from "../../utils/getFromEnv";
import { $APIGatewayRuntimeFactory } from "../runtime/APIGatewayRuntime";

const metabaseSecret = getFromEnv({
  name: "METABASE_SECRET",
  fatal: true,
});

const runtimeFactory = $APIGatewayRuntimeFactory();

export const embed: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  apiContext: APIGatewayContext
) => {
  const runtime = await runtimeFactory.create({
    apiContext,
    factory: ({ context }) =>
      $MetabaseEmbedding({ context, secret: metabaseSecret }),
  });

  return await runtime({ event });
};
