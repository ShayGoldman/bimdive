import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  Context as APIGatewayContext,
} from "aws-lambda";
import { $ProxyADAPI } from "../../api/proxy-ad-api.service";
import { getFromEnv } from "../../utils/getFromEnv";
import { $APIEnvironment } from "../environments";

const cacheSize = getFromEnv({
  name: "API_PROXY_CACHE_SIZE",
});

const { context, services, runtimeFactory } = $APIEnvironment();

const handler = $ProxyADAPI({
  context,
  services,
  cacheSize: parseInt(cacheSize || "100"),
});

export const proxyADAPI: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  apiContext: APIGatewayContext
) => {
  const runtime = runtimeFactory.create({
    apiContext,
    factory: () => handler,
  });

  return await runtime({ event });
};
