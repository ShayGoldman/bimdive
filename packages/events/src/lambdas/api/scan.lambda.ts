import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  Context as APIGatewayContext,
} from "aws-lambda";
import { $CreateScan } from "../../api/scan/create-scan.service";
import { $APIGatewayRuntimeFactory } from "../runtime/APIGatewayRuntime";

const runtimeFactory = $APIGatewayRuntimeFactory();

export const createScan: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  apiContext: APIGatewayContext
) => {
  const runtime = await runtimeFactory.create({
    apiContext,
    factory: ({ context }) => $CreateScan({ context }),
  });

  return await runtime({ event });
};
