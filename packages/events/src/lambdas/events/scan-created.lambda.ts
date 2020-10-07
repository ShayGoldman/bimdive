import { Context, SQSEvent, SQSHandler } from "aws-lambda";
import { $ScanCreatedHandler } from "../../handlers/scan-created.handler";
import { getFromEnv } from "../../utils/getFromEnv";
import { $SQSEnvironment } from "../environments";

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

const { context, runtimeFactory, servicesPromise } = $SQSEnvironment();

export const handle: SQSHandler = async (
  event: SQSEvent,
  apiContext: Context
) => {
  const services = await servicesPromise;

  const runtime = await runtimeFactory.create({
    apiContext,
    factory: () =>
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
