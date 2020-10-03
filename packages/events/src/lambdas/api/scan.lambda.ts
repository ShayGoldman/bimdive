import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  Context as APIGatewayContext,
} from "aws-lambda";
import { $CreateScan } from "../../api/scan/create-scan.service";
import { getFromEnv } from "../../utils/getFromEnv";
import { $APIGatewayRuntimeFactory } from "../runtime/APIGatewayRuntime";

const runtimeFactory = $APIGatewayRuntimeFactory();

const scanCreatedQueue = getFromEnv({
  name: "QUEUE_SCAN_CREATED",
  fatal: true,
});

export const createScan: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  apiContext: APIGatewayContext
) => {
  const runtime = await runtimeFactory.create({
    apiContext,
    factory: ({ context }) => $CreateScan({ context, scanCreatedQueue }),
  });

  return await runtime({ event });
};
