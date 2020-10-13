import axios, { AxiosInstance } from "axios";
import { Logger } from "./logger.service";

type Deps = {
  logger: Logger;
};

type Params = {
  token?: string;
};

export type BIMApi = AxiosInstance;

export type BIMApiFactory = (parms: Params) => BIMApi;

/*
    const token = await getTokenFromScanId(scanId);
    const api = bimApiFactory({ token });
*/
// todo moving token fetching here
export function $BIMApiFactory({ logger }: Deps): BIMApiFactory {
  return function $BimApi({ token }: { token?: string }): BIMApi {
    const instance = axios.create({
      baseURL: "https://developer.api.autodesk.com",
      headers: Object.assign(
        {},
        token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {}
      ),
    });

    instance.interceptors.request.use(
      (request) => {
        const { baseURL, url, method, params } = request;
        logger.debug({ msg: "bim-api request", baseURL, url, method, params });
        return request;
      },
      (error) => {
        logger.error("bim-api request error", error);
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
          msg: "bim-api response",
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
              msg: "bim-api response warning",
            });
          }
        }
        return response.data;
      },
      (error) => {
        logger.error({ msg: "bim-api request error", error });
      }
    );

    return instance;
  };
}
