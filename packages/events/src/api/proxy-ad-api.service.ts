import { APIGatewayProxyEvent } from "aws-lambda";
import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";
import LRUCache from "lru-cache";
import objectHash from "object-hash";
import { Context } from "../services/context.service";
import { Services } from "../services/service-provider";
import { instrumentAxiosInstance } from "../utils/axios-logging";

type ProxyAPIRequestConfig = AxiosRequestConfig & {
  url: string;
  method: Method;
  scanId: string;
};

export type ProxyADAPIClient = <T = any>(
  config: ProxyAPIRequestConfig
) => Promise<AxiosResponse<T>>;

export const $ProxyADAPIClient = ({
  context,
  proxyPath,
}: {
  context: Context;
  proxyPath: string;
}) => {
  return async function proxyADAPIClient({
    scanId,
    ...config
  }: ProxyAPIRequestConfig): Promise<any> {
    const { logger } = context;
    const api = axios.create();

    instrumentAxiosInstance({ logger, instance: api });

    return api.post(proxyPath, { scanId, ...config });
  };
};

export const $ProxyADAPI = ({
  cacheSize,
  services,
  context,
}: {
  cacheSize: number;
  services: Services;
  context: Context;
}) => {
  const cache = new LRUCache({
    max: cacheSize,
  });

  return async function proxyADApi<T>({
    event,
  }: {
    event: APIGatewayProxyEvent;
  }) {
    const { logger } = context;
    const { bimApiFactory } = services;
    const { scanId, ...config }: ProxyAPIRequestConfig = JSON.parse(
      event.body || "{}"
    );

    const requestMetadata = {
      scanId,
      method: config.method,
      url: config.url,
      params: config.params,
    };
    const hash = objectHash(requestMetadata);

    const value = cache.get(hash);

    if (value) {
      logger.debug({
        msg: "cache hit",
        ...requestMetadata,
        hash,
      });
      return { data: value as AxiosResponse<T> };
    } else {
      logger.debug({
        msg: "cache miss",
        ...requestMetadata,
        hash,
      });
      const api = await bimApiFactory({ scanId });
      const response: AxiosResponse<T> = await api.request(config);
      cache.set(hash, response);
      return { data: response };
    }
  };
};
