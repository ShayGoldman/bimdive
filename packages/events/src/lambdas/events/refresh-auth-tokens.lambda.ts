import { AccessTokensApi } from "@bimdive/rest-api-client";
import { Context, ScheduledEvent, ScheduledHandler } from "aws-lambda";
import dayjs from "dayjs";
import { pick } from "lodash";
import { getFromEnv } from "../../utils/getFromEnv";
import { $SQSEnvironment } from "../environments";
import axios from "axios";
import querystring from "querystring";

const { context, services } = $SQSEnvironment();

const LOOK_AHEAD_IN_MINUTES = getFromEnv({
  name: "LOOK_AHEAD_IN_MINUTES",
  fatal: true,
});

const FORGE_CLIENT_SECRET = getFromEnv({
  name: "FORGE_CLIENT_SECRET",
  fatal: true,
  logValue: false,
});

const FORGE_CLIENT_ID = getFromEnv({
  name: "FORGE_CLIENT_ID",
  fatal: true,
  logValue: false,
});

export const handle: ScheduledHandler = async (
  event: ScheduledEvent,
  apiContext: Context
) => {
  const { logger } = context;
  const { restApiUtils } = services;
  const tokens = new AccessTokensApi(restApiUtils.configuration);

  logger.info({
    msg: "recieved event",
    id: event.id,
  });

  const lookAhead = dayjs(Date.now())
    .add(parseInt(LOOK_AHEAD_IN_MINUTES), "minute")
    .toDate()
    .toUTCString();

  const results = await tokens.accessTokensGet({
    expiresAt: restApiUtils.operators.lessEqualThen(lookAhead),
  });

  logger.info({
    msg: "found tokens to refresh",
    count: results.length,
  });

  for (const token of results) {
    logger.info({
      msg: "refreshing token",
      ...pick(token, "userProviderId", "issuedAt"),
    });

    const { data: newToken } = await axios.post(
      "https://developer.api.autodesk.com/authentication/v1/refreshtoken",
      querystring.stringify({
        client_id: FORGE_CLIENT_ID,
        client_secret: FORGE_CLIENT_SECRET,
        refresh_token: token.refreshToken,
        grant_type: "refresh_token",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

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
      msg: "token refreshed",
      expiresAt,
      userProviderId: token.userProviderId,
    });
  }

  logger.info({
    msg: "event handled",
    id: event.id,
  });
};
