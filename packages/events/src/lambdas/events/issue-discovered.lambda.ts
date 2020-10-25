import { Context, SQSEvent, SQSHandler } from "aws-lambda";
import { $IssueDiscoveredHandler } from "../../handlers/issue-discovered.handler";
import { getFromEnv } from "../../utils/getFromEnv";
import { $SQSEnvironment } from "../environments";

const userDiscoveredQueue = getFromEnv({
  name: "QUEUE_USER_DISCOVERED",
  fatal: true,
});

const { context, runtimeFactory, services } = $SQSEnvironment();

export const handle: SQSHandler = async (
  event: SQSEvent,
  apiContext: Context
) => {
  const runtime = await runtimeFactory.create({
    apiContext,
    factory: () =>
      $IssueDiscoveredHandler({ context, services, userDiscoveredQueue }),
  });

  await runtime({ event });
};
