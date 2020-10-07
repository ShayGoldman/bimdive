import { SQSEvent, SQSHandler } from "aws-lambda";
import { $IssueContainerDiscoveredHandler } from "../../handlers/issue-container-discovered.handler";
import { $SQSRuntimeFactory } from "../runtime/SQSRuntime";

const runtimeFactory = $SQSRuntimeFactory();

export const handle: SQSHandler = async (event: SQSEvent) => {
  const runtime = await runtimeFactory.create({
    factory: $IssueContainerDiscoveredHandler,
  });

  await runtime({ event });
};
