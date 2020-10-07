import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  Context as APIGatewayContext,
} from "aws-lambda";
import { $AuthenticateUser } from "../../api/auth/authenticate-user.service";
import { $APIGatewayRuntimeFactory } from "../runtime/APIGatewayRuntime";

export const authenticateUser: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  apiContext: APIGatewayContext
) => {
  const runtime = await $APIGatewayRuntimeFactory().create({
    apiContext,
    factory: $AuthenticateUser,
  });

  return await runtime({ event });
};
