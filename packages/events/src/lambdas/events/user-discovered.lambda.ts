import { Context, SQSEvent, SQSHandler } from "aws-lambda";
import { $UserDiscoveredHandler } from "../../handlers/user-discovered.handler";
import { $SQSEnvironment } from "../environments";

const { context, runtimeFactory, servicesPromise } = $SQSEnvironment();

export const handle: SQSHandler = async (
  event: SQSEvent,
  apiContext: Context
) => {
  const services = await servicesPromise;

  const runtime = await runtimeFactory.create({
    apiContext,
    factory: () => $UserDiscoveredHandler({ context, services }),
  });

  await runtime({ event });
};
