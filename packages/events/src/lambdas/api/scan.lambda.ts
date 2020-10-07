import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  Context as APIGatewayContext,
} from "aws-lambda";
import { $CreateScan } from "../../api/scan/create-scan.service";
import { getFromEnv } from "../../utils/getFromEnv";
import { $APIEnvironment } from "../environments";

const scanCreatedQueue = getFromEnv({
  name: "QUEUE_SCAN_CREATED",
  fatal: true,
});

const { context, runtimeFactory, servicesPromise } = $APIEnvironment();

export const createScan: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  apiContext: APIGatewayContext
) => {
  const services = await servicesPromise;
  const runtime = runtimeFactory.create({
    apiContext,
    factory: () =>
      $CreateScan({
        context,
        services,
        scanCreatedQueue,
      }),
  });

  return await runtime({ event });
};
