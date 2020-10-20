import { AccessTokensApi, ScansApi, UsersApi } from "@bimdive/rest-api-client";
import axios, { AxiosInstance } from "axios";
import { Logger } from "./logger.service";
import { RESTApiUtils } from "./rest-api-utils";

type Deps = {
  logger: Logger;
  restApiUtils: RESTApiUtils;
};

type Params =
  | { token: string }
  | {
      scanId: string;
    };

export type BIMApi = AxiosInstance;

export type BIMApiFactory = (parms: Params) => Promise<BIMApi>;

export function $BIMApiFactory({ logger, restApiUtils }: Deps): BIMApiFactory {
  // part of 3-legged-token flow
  // https://forge.autodesk.com/en/docs/oauth/v2/tutorials/get-3-legged-token/
  async function getTokenFromScanId(scanId: string): Promise<string> {
    const users = new UsersApi(restApiUtils.configuration);
    const scans = new ScansApi(restApiUtils.configuration);
    const tokens = new AccessTokensApi(restApiUtils.configuration);

    const [scan] = await scans.scansGet({
      id: restApiUtils.operators.equals(scanId),
      limit: "1",
    });

    logger.trace({
      msg: "found scan for token",
      ...scan,
    });

    const [user] = await users.usersGet({
      id: restApiUtils.operators.equals(scan.initiatingUserId),
      limit: "1",
    });

    logger.trace({
      msg: "found user for token",
      ...user,
    });

    const [{ accessToken }] = await tokens.accessTokensGet({
      userProviderId: restApiUtils.operators.equals(user.providerId),
    });

    logger.trace({
      msg: "token for scan",
      scanId,
      token: Boolean(accessToken),
      success: Boolean(accessToken),
      ...user,
    });

    return accessToken;
  }

  return async function $BimApi({
    scanId,
    token,
  }: {
    scanId: string;
    token: string;
  }): Promise<BIMApi> {
    const authToken = token || (await getTokenFromScanId(scanId));

    const instance = axios.create({
      baseURL: "https://developer.api.autodesk.com",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
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
