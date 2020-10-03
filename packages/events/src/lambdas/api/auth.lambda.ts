import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  Context as APIGatewayContext,
} from "aws-lambda";
import { $AuthenticateUser } from "../../api/auth/authenticate-user.service";
import { $APIGatewayRuntimeFactory } from "../runtime/APIGatewayRuntime";

const runtimeFactory = $APIGatewayRuntimeFactory();

export const authenticateUser: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  apiContext: APIGatewayContext
) => {
  const runtime = await runtimeFactory.create({
    apiContext,
    factory: ({ context }) => $AuthenticateUser({ context }),
  });

  return await runtime({ event });
};
