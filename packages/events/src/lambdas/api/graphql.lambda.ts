import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  Context as APIGatewayContext,
} from "aws-lambda";
import { $GraphQL } from "../../api/graphql/graphql.service";
import { $APIGatewayRuntimeFactory } from "../runtime/APIGatewayRuntime";

const runtimeFactory = $APIGatewayRuntimeFactory();

export const grapqhl: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  apiContext: APIGatewayContext
) => {
  const runtime = await runtimeFactory.create({
    apiContext,
    factory: ({ context }) => $GraphQL({ context }),
  });

  return await runtime({ event });
};
