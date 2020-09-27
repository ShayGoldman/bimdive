import { SQSEvent, SQSHandler } from "aws-lambda";
import { $IssueDiscoveredHandler } from "../handlers/issue-discovered.handler";
import { $Context } from "../services/context.service";
import { $SQSRuntime } from "./SQSRuntime";

export const handle: SQSHandler = async (event: SQSEvent) => {
  const context = await $Context();
  const handler = $IssueDiscoveredHandler({ context });
  const runtime = $SQSRuntime({ context });

  await runtime({ event, handler });
};
