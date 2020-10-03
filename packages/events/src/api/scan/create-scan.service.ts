import { APIGatewayProxyEvent } from "aws-lambda";
import { Context } from "../../services/context.service";

export const $CreateScan = ({
  context,
  scanCreatedQueue,
}: {
  context: Context;
  scanCreatedQueue: string;
}) => {
  return async function createScan({ event }: { event: APIGatewayProxyEvent }) {
    const { logger, db, sqs } = context;
    const { userId } = JSON.parse(event.body || "{}");

    logger.info({
      msg: "creating scan",
      userId,
    });

    const [scanId] = await db("events.scans").insert(
      {
        initiating_user_id: userId,
      },
      "id"
    );

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
