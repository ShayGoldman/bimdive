import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  Context as APIGatewayContext,
} from "aws-lambda";
import { $AuthenticateUser } from "../../api/authenticate-user.service";
import { $APIEnvironment } from "../environments";

const { context, runtimeFactory, services } = $APIEnvironment();

export const authenticateUser: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  apiContext: APIGatewayContext
) => {
  const runtime = runtimeFactory.create({
    apiContext,
    factory: () => $AuthenticateUser({ context, services }),
  });

  return await runtime({ event });
};
