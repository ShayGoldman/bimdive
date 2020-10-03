import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  Context as APIGatewayContext,
} from "aws-lambda";
import { $MetabaseEmbedding } from "../../api/metabase/metabase-embedding.service";
import { $APIGatewayRuntimeFactory } from "../runtime/APIGatewayRuntime";

const runtimeFactory = $APIGatewayRuntimeFactory();

export const embed: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  apiContext: APIGatewayContext
) => {
  const runtime = await runtimeFactory.create({
    apiContext,
    factory: ({ context }) => $MetabaseEmbedding({ context }),
  });

  return await runtime({ event });
};
