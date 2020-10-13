import axios from "axios";
import querystring from "querystring";
import { getFromEnv } from "../utils/getFromEnv";
import { $BIMApiFactory, BIMApiFactory } from "./bim-api-factory.service";
import { Context } from "./context.service";
import { Logger } from "./logger.service";
import { $SQS, SQS } from "./sqs.service";
import { $RESTApiUtils, RESTApiUtils } from "./rest-api-utils";
import { AccessTokensApi, ScansApi, UsersApi } from "@bimdive/rest-api-client";
import {
  $BIMAccessTokensService,
  BIMAccessTokensService,
} from "./bim-access-tokens.service";

export type Services = {
  restApiUtils: RESTApiUtils;
  bimApiFactory: BIMApiFactory;
  sqs: SQS;
  getTokenFromScanId: (scanId: string) => Promise<string>;
  generateTemporaryAPIToken: () => Promise<string>;
  tokens: BIMAccessTokensService;
};

// part of 3-legged-token flow
// https://forge.autodesk.com/en/docs/oauth/v2/tutorials/get-3-legged-token/
function $GetTokenFromScanId({
  logger,
  restApiUtils,
}: {
  logger: Logger;
  restApiUtils: RESTApiUtils;
}) {
  return async function getTokenFromScanId(scanId: string): Promise<string> {
    const users = new UsersApi(restApiUtils.configuration);
    const scans = new ScansApi(restApiUtils.configuration);
    const tokens = new AccessTokensApi(restApiUtils.configuration);

    const [scan] = await scans.scansGet({
      id: restApiUtils.operators.equals(scanId),
      limit: "1",
    });

    logger.debug({
      msg: "found scan for token",
      ...scan,
    });

    const [user] = await users.usersGet({
      id: restApiUtils.operators.equals(scan.initiatingUserId),
      limit: "1",
    });

    logger.debug({
      msg: "found user for token",
      ...user,
    });

    const [{ accessToken }] = await tokens.accessTokensGet({
      userProviderId: restApiUtils.operators.equals(user.providerId),
    });

    logger.debug({
      msg: "token for scan",
      scanId,
      token: Boolean(accessToken),
      success: Boolean(accessToken),
      ...user,
    });

    return accessToken;
  };
}

// 2-legged-token
// https://forge.autodesk.com/en/docs/oauth/v2/tutorials/get-2-legged-token/
function $GenerateTemporaryAPIToken({
  clientId,
  clientSecret,
}: {
  clientId: string;
  clientSecret: string;
}) {
  return async function generateTemporaryAPIToken(): Promise<string> {
    const { data } = await axios.post(
      "https://developer.api.autodesk.com/authentication/v1/authenticate",
      querystring.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "client_credentials",
        scope: "data:read account:read",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return data.access_token;
  };
}

export const $ServiceProvider = ({
  context,
}: {
  context: Context;
}): Services => {
  const { logger } = context;

  const clientId = getFromEnv({
    name: "FORGE_CLIENT_ID",
    fatal: true,
    logValue: false,
  });
  const clientSecret = getFromEnv({
    name: "FORGE_CLIENT_SECRET",
    fatal: true,
    logValue: false,
  });

  const sqs = $SQS({ logger });

  const bimApiFactory = $BIMApiFactory({ logger });

  const restApiUtils = $RESTApiUtils({ context });

  const tokens = $BIMAccessTokensService({
    forgeClientId: clientId,
    forgeClientSecret: clientSecret,
    logger,
    restApiUtils,
  });

  return {
    bimApiFactory,
    sqs,
    restApiUtils,
    getTokenFromScanId: $GetTokenFromScanId({ logger, restApiUtils }),
    generateTemporaryAPIToken: $GenerateTemporaryAPIToken({
      clientId,
      clientSecret,
    }),
    tokens,
  };
};
