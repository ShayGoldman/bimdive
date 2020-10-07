import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  Context as APIGatewayContext,
} from "aws-lambda";
import { $GraphQL } from "../../api/graphql/graphql.service";
import { $APIGatewayRuntimeFactory } from "../runtime/APIGatewayRuntime";

export const grapqhl: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  apiContext: APIGatewayContext
) => {
  const runtime = await $APIGatewayRuntimeFactory().create({
    apiContext,
    factory: $GraphQL,
  });

  return await runtime({ event });
};
