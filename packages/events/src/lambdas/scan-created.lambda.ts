import { SQSEvent, SQSHandler } from "aws-lambda";
import { $ScanCreatedHandler } from "../handlers/scan-created.handler";
import { $Context } from "../services/context.service";
import { getFromEnv } from "../utils/getFromEnv";
import { $SQSRuntime } from "./SQSRuntime";

export const handle: SQSHandler = async (event: SQSEvent) => {
  const context = await $Context();
  const issueDiscoveredQueue = getFromEnv("QUEUE_ISSUE_DISCOVERED");

  if (!issueDiscoveredQueue) {
    context.logger.fatal("no queue supplied for IssueDiscovered messages");
    throw new Error("Fatal error, check the logs for details");
  }

  const handler = $ScanCreatedHandler({ context, issueDiscoveredQueue });
  const runtime = $SQSRuntime({ context });

  await runtime({ event, handler });
};
