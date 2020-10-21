import axios, { AxiosInstance } from "axios";
import { instrumentAxiosInstance } from "../utils/axios-logging";
import { BIMAccessTokensService } from "./bim-access-tokens.service";
import { Logger } from "./logger.service";

type Deps = {
  logger: Logger;
  tokens: BIMAccessTokensService;
};

type Params =
  | { token: string }
  | {
      scanId: string;
    };

export type BIMApi = AxiosInstance;

export type BIMApiFactory = (parms: Params) => Promise<BIMApi>;

export function $BIMApiFactory({ logger, tokens }: Deps): BIMApiFactory {
  return async function $BimApi({
    scanId,
    token,
  }: {
    scanId: string;
    token: string;
  }): Promise<BIMApi> {
    const authToken = token || (await tokens.getTokenFromScanId(scanId));

    const instance = axios.create({
      baseURL: "https://developer.api.autodesk.com",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    instrumentAxiosInstance({ logger, instance });

    return instance;
  };
}
