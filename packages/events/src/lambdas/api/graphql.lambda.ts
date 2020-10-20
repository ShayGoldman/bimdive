import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  Context as APIGatewayContext,
} from "aws-lambda";
import { $GraphQL } from "../../api/graphql.service";
import { $APIEnvironment } from "../environments";

const { context, runtimeFactory } = $APIEnvironment();

export const grapqhl: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  apiContext: APIGatewayContext
) => {
  const runtime = runtimeFactory.create({
    apiContext,
    factory: () => $GraphQL({ context }),
  });

  return await runtime({ event });
};
