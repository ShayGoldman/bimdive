import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  Context as APIGatewayContext,
} from "aws-lambda";
import { $CreateProjectScans } from "../../api/scan/create-project-scans.service";
import { getFromEnv } from "../../utils/getFromEnv";
import { $APIEnvironment } from "../environments";

const scanCreatedQueue = getFromEnv({
  name: "QUEUE_SCAN_CREATED",
  fatal: true,
});

const { context, services, runtimeFactory } = $APIEnvironment();

export const createProjectScans: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  apiContext: APIGatewayContext
) => {
  const runtime = runtimeFactory.create({
    apiContext,
    factory: () =>
      $CreateProjectScans({
        context,
        services,
        scanCreatedQueue,
      }),
  });

  return await runtime({ event });
};
