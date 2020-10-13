import { Logger } from "./logger.service";
import axios from "axios";
import querystring from "querystring";
import dayjs from "dayjs";
import { RESTApiUtils } from "./rest-api-utils";
import { AccessTokensApi } from "@bimdive/rest-api-client";

export type BIMAccessTokensService = {
  refreshToken: (userProviderId: string) => Promise<void>;
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

  async function refreshToken(userProviderId: string) {
    logger.info({
      msg: "refreshing token",
      userProviderId,
    });

    const [token] = await tokens.accessTokensGet({
      userProviderId: restApiUtils.operators.equals(userProviderId),
    });

    if (!token) {
      throw new Error(`Token for user [${userProviderId}] not found`);
    }

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

    logger.info({
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

    logger.info({
      msg: "new token saved",
      expiresAt,
      userProviderId: token.userProviderId,
    });
  }

  return {
    refreshToken,
  };
};
