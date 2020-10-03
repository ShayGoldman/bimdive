import { SQSEvent, SQSHandler } from "aws-lambda";
import { $IssueDiscoveredHandler } from "../../handlers/issue-discovered.handler";
import { $SQSRuntimeFactory } from "../runtime/SQSRuntime";

const runtimeFactory = $SQSRuntimeFactory();

export const handle: SQSHandler = async (event: SQSEvent) => {
  const runtime = await runtimeFactory.create({
    factory: ({ context }) => $IssueDiscoveredHandler({ context }),
  });

  await runtime({ event });
};
