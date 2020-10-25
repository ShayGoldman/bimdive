import { AxiosInstance } from "axios";
import { Logger } from "../services/logger.service";
import omit from "lodash/omit";

export function instrumentAxiosInstance({
  logger,
  instance,
}: {
  logger: Logger;
  instance: AxiosInstance;
}): void {
  instance.interceptors.request.use(
    (request) => {
      const { baseURL, url, method, params } = request;
      logger.debug({ msg: "bim-api request", baseURL, url, method, params });
      return request;
    },
    (error) => {
      logger.error({
        msg: "bim-api request error",
        ...error,
      });
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
      logger.error({
        msg: "bim-api response error",
        response: omit(error.response, "request"),
      });
    }
  );
}
