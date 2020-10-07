import { APIGatewayProxyEvent } from "aws-lambda";
import { Context } from "../../services/context.service";
import { Services } from "../../services/service-provider";

export const $CreateScan = ({
  context,
  scanCreatedQueue,
  services,
}: {
  context: Context;
  services: Services;
  scanCreatedQueue: string;
}) => {
  return async function createScan({ event }: { event: APIGatewayProxyEvent }) {
    const { logger } = context;
    const { sqs, db } = services;
    const { email } = JSON.parse(event.body || "{}");

    logger.info({
      msg: "scan requested",
      email,
    });

    const [initiatingUser] = await db("events.users").select().where({ email });

    if (!initiatingUser) {
      return { error: "scan not possible" };
    }

    const [scanId] = await db("events.scans").insert(
      {
        initiating_user_id: initiatingUser.id,
      },
      "id"
    );

    logger.info({
      msg: "scan created",
      initiatingUserId: initiatingUser.id,
      scanId,
    });

    await sqs.sendMessage({
      queue: scanCreatedQueue,
      message: {
        type: "ScanCreated",
        scanId,
      },
    });

    return { data: { id: scanId } };
  };
};
