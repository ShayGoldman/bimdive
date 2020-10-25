import { AccessTokensApi } from "@bimdive/rest-api-client";
import { Context, ScheduledEvent, ScheduledHandler } from "aws-lambda";
import dayjs from "dayjs";
import { getFromEnv } from "../../utils/getFromEnv";
import { $SQSEnvironment } from "../environments";

const { context, services } = $SQSEnvironment();

const LOOK_AHEAD_IN_MINUTES = getFromEnv({
  name: "LOOK_AHEAD_IN_MINUTES",
  fatal: true,
});

export const handle: ScheduledHandler = async (
  event: ScheduledEvent,
  apiContext: Context
) => {
  apiContext.callbackWaitsForEmptyEventLoop = false;
  const { logger } = context;
  const { restApiUtils, tokens } = services;
  const tokensDB = new AccessTokensApi(restApiUtils.configuration);
  logger.info({
    msg: "recieved event",
    id: event.id,
  });

  const lookAhead = dayjs(Date.now())
    .add(parseInt(LOOK_AHEAD_IN_MINUTES), "minute")
    .toDate()
    .toUTCString();

  const results = await tokensDB.accessTokensGet({
    expiresAt: restApiUtils.operators.lessEqualThen(lookAhead),
  });

  logger.info({
    msg: "found tokens to refresh",
    count: results.length,
  });

  for (const token of results) {
    await tokens.refreshToken(token.userProviderId);
  }

  logger.info({
    msg: "event handled",
    id: event.id,
  });
};
