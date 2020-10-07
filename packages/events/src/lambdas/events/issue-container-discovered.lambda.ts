import { Context, SQSEvent, SQSHandler } from "aws-lambda";
import { $IssueContainerDiscoveredHandler } from "../../handlers/issue-container-discovered.handler";
import { $SQSRuntimeFactory } from "../runtime/SQSRuntime";

const runtimeFactory = $SQSRuntimeFactory();

export const handle: SQSHandler = async (
  event: SQSEvent,
  apiContext: Context
) => {
  const runtime = await runtimeFactory.create({
    apiContext,
    factory: $IssueContainerDiscoveredHandler,
  });

  await runtime({ event });
};
