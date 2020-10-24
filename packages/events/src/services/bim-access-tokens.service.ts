import { AccessTokensApi, ScansApi, UsersApi } from "@bimdive/rest-api-client";
import axios from "axios";
import dayjs from "dayjs";
import querystring from "querystring";
import { Logger } from "./logger.service";
import { RESTApiUtils } from "./rest-api-utils";

export type BIMAccessTokensService = {
  refreshToken: (
    userProviderId: string,
    minimalTokenAge?: number
  ) => Promise<string>;
  getTokenForUser: (userProviderId: string) => Promise<string>;
  getTokenFromScanId: (scanId: string) => Promise<string>;
  generateTemporaryAPIToken: () => Promise<string>;
};

type Deps = {
  logger: Logger;
  forgeClientId: string;
  forgeClientSecret: string;
  restApiUtils: RESTApiUtils;
};

export const $BIMAccessTokensService = ({
  logger,
  restApiUtils,
  forgeClientId,
  forgeClientSecret,
}: Deps): BIMAccessTokensService => {
  const tokens = new AccessTokensApi(restApiUtils.configuration);

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

  // 2-legged-token
  // https://forge.autodesk.com/en/docs/oauth/v2/tutorials/get-2-legged-token/
  async function generateTemporaryAPIToken(): Promise<string> {
    const { data } = await axios.post(
      "https://developer.api.autodesk.com/authentication/v1/authenticate",
      querystring.stringify({
        client_id: forgeClientId,
        client_secret: forgeClientSecret,
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
  }

  async function refreshToken(
    userProviderId: string,
    minimalTokenAge: number = 0
  ) {
    logger.info({
      msg: "refreshing token",
      userProviderId,
    });

    const minimalTokenIssueTime = dayjs(Date.now()).subtract(
      minimalTokenAge,
      "minute"
    );

    const [token] = await tokens.accessTokensGet({
      userProviderId: restApiUtils.operators.equals(userProviderId),
    });

    if (!token) {
      throw new Error(`Token for user [${userProviderId}] not found`);
    } else if (minimalTokenIssueTime.isBefore(token.issuedAt)) {
      logger.debug({
        msg: "reusing existing token",
      });
      return token.accessToken;
    } else {
      const { data: newToken } = await axios.post(
        "https://developer.api.autodesk.com/authentication/v1/refreshtoken",
        querystring.stringify({
          client_id: forgeClientId,
          client_secret: forgeClientSecret,
          refresh_token: token.refreshToken,
          grant_type: "refresh_token",
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      logger.debug({
        msg: "new token generated",
        userProviderId: token.userProviderId,
      });

      const issuedAt = restApiUtils.now();
      const expiresAt = dayjs(issuedAt)
        .add(newToken.expires_in - 60, "second") // minus 60 for safety, doesn't really matter
        .toDate()
        .toUTCString();

      await tokens.accessTokensPost({
        accessTokens: {
          accessToken: newToken.access_token,
          expiresAt,
          issuedAt,
          refreshToken: newToken.refresh_token,
          userProviderId: token.userProviderId,
        },
      });

      logger.debug({
        msg: "new token saved",
        expiresAt,
        userProviderId: token.userProviderId,
      });

      return newToken.access_token;
    }
  }

  async function getTokenForUser(userProviderId: string) {
    const [token] = await tokens.accessTokensGet({
      userProviderId: restApiUtils.operators.equals(userProviderId),
    });

    if (!token) {
      throw new Error(`Token not found for [${userProviderId}]`);
    }

    return token.accessToken;
  }

  return {
    refreshToken,
    getTokenForUser,
    getTokenFromScanId,
    generateTemporaryAPIToken,
  };
};
