import { SQSEvent, SQSHandler } from "aws-lambda";
import { $IssueDiscoveredHandler } from "../../handlers/issue-discovered.handler";
import { getFromEnv } from "../../utils/getFromEnv";
import { $SQSRuntimeFactory } from "../runtime/SQSRuntime";

const userDiscoveredQueue = getFromEnv({
  name: "QUEUE_USER_DISCOVERED",
  fatal: true,
});

const runtimeFactory = $SQSRuntimeFactory();

export const handle: SQSHandler = async (event: SQSEvent) => {
  const runtime = await runtimeFactory.create({
    factory: ({ context }) =>
      $IssueDiscoveredHandler({ context, userDiscoveredQueue }),
  });

  await runtime({ event });
};
