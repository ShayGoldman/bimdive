import { SQSEvent, SQSHandler } from "aws-lambda";
import { $ScanCreatedHandler } from "../../handlers/scan-created.handler";
import { getFromEnv } from "../../utils/getFromEnv";
import { $SQSRuntimeFactory } from "../runtime/SQSRuntime";

const runtimeFactory = $SQSRuntimeFactory();

const issueDiscoveredQueue = getFromEnv({
  name: "QUEUE_ISSUE_DISCOVERED",
  fatal: true,
});
const issueContainerDiscoveredQueue = getFromEnv({
  name: "QUEUE_ISSUE_CONTAINER_DISCOVERED",
  fatal: true,
});
const shouldEmitMessages = Boolean(
  parseInt(
    getFromEnv({
      name: "EMIT_MESSAGES",
    }) || "1"
  )
);

export const handle: SQSHandler = async (event: SQSEvent) => {
  const runtime = await runtimeFactory.create({
    factory: ({ context, services }) =>
      $ScanCreatedHandler({
        context,
        services,
        issueDiscoveredQueue,
        issueContainerDiscoveredQueue,
        shouldEmitMessages,
      }),
  });

  await runtime({ event });
};
