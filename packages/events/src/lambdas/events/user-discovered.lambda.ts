import { SQSEvent, SQSHandler } from "aws-lambda";
import { $UserDiscoveredHandler } from "../../handlers/user-discovered.handler";
import { $SQSRuntimeFactory } from "../runtime/SQSRuntime";

const runtimeFactory = $SQSRuntimeFactory();

export const handle: SQSHandler = async (event: SQSEvent) => {
  const runtime = await runtimeFactory.create({
    factory: ({ context }) => $UserDiscoveredHandler({ context }),
  });

  await runtime({ event });
};
