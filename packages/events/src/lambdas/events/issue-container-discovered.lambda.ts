import { Context, SQSEvent, SQSHandler } from "aws-lambda";
import { $IssueContainerDiscoveredHandler } from "../../handlers/issue-container-discovered.handler";
import { $SQSEnvironment } from "../environments";

const { context, runtimeFactory, services } = $SQSEnvironment();

export const handle: SQSHandler = async (
  event: SQSEvent,
  apiContext: Context
) => {
  const runtime = await runtimeFactory.create({
    apiContext,
    factory: () => $IssueContainerDiscoveredHandler({ context, services }),
  });

  await runtime({ event });
};
