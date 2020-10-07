import { Context, SQSEvent, SQSHandler } from "aws-lambda";
import { $UserDiscoveredHandler } from "../../handlers/user-discovered.handler";
import { $SQSRuntimeFactory } from "../runtime/SQSRuntime";

const runtimeFactory = $SQSRuntimeFactory();

export const handle: SQSHandler = async (
  event: SQSEvent,
  apiContext: Context
) => {
  const runtime = await runtimeFactory.create({
    apiContext,
    factory: $UserDiscoveredHandler,
  });

  await runtime({ event });
};
