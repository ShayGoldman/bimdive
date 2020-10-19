import { Context, SQSEvent, SQSHandler } from "aws-lambda";
import { $UserDiscoveredHandler } from "../../handlers/user-discovered.handler";
import { getFromEnv } from "../../utils/getFromEnv";
import { $SQSEnvironment } from "../environments";

const { context, runtimeFactory, services } = $SQSEnvironment();

const userDiscoveredFreshness = getFromEnv({
  name: "USER_DISCOVERED_FRESHNESS_IN_MINUTES",
});

export const handle: SQSHandler = async (
  event: SQSEvent,
  apiContext: Context
) => {
  const runtime = await runtimeFactory.create({
    apiContext,
    factory: () =>
      $UserDiscoveredHandler({
        context,
        services,
        userDiscoveredFreshness: parseInt(userDiscoveredFreshness || "60"),
      }),
  });

  await runtime({ event });
};
