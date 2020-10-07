import { Context, SQSEvent, SQSHandler } from "aws-lambda";
import { $IssueDiscoveredHandler } from "../../handlers/issue-discovered.handler";
import { getFromEnv } from "../../utils/getFromEnv";
import { $SQSRuntimeFactory } from "../runtime/SQSRuntime";

const userDiscoveredQueue = getFromEnv({
  name: "QUEUE_USER_DISCOVERED",
  fatal: true,
});

const runtimeFactory = $SQSRuntimeFactory();

export const handle: SQSHandler = async (
  event: SQSEvent,
  apiContext: Context
) => {
  const runtime = await runtimeFactory.create({
    apiContext,
    factory: ({ context, services }) =>
      $IssueDiscoveredHandler({ context, services, userDiscoveredQueue }),
  });

  await runtime({ event });
};
