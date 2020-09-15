import axios, { AxiosInstance } from "axios";
import { Logger } from "./logger.service";

type APIParams = {
  token: string;
  logger: Logger;
};

export type BIMApi = AxiosInstance;

export function $BIMApi({ token, logger }: APIParams): BIMApi {
  const instance = axios.create({
    baseURL: "https://developer.api.autodesk.com",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  instance.interceptors.request.use(
    (request) => {
      const { baseURL, url, method, params } = request;
      logger.debug({ msg: "BIMApi request", baseURL, url, method, params });
      return request;
    },
    (error) => {
      logger.error("BIMAPI request error", error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      const {
        status,
        request,
        config: { baseURL, url, method, params },
        data,
      } = response;

      logger.debug({
        msg: "BIMApi response",
        baseURL,
        url,
        status,
        method,
        params,
      });

      if (data?.meta?.warnings) {
        const { baseURL, method, params } = request;
        for (const warning of data.meta.warnings) {
          logger.warn({
            baseURL,
            url,
            status,
            method,
            params,
            ...warning,
            msg: "BIMApi response warning",
          });
        }
      }
      return response.data;
    },
    (error) => {
      logger.error({ msg: "BIMAPI request error", error });
    }
  );

  logger.info(`BIMApi instatiated`);

  return instance;
}
