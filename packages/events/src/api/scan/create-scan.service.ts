import { ScansApi, UsersApi } from "@bimdive/rest-api-client";
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
    const { sqs, restApiUtils } = services;
    const users = new UsersApi(restApiUtils.configuration);
    const scans = new ScansApi(restApiUtils.configuration);
    const { email } = JSON.parse(event.body || "{}");

    logger.info({
      msg: "scan requested",
      email,
    });

    const [initiatingUser] = await users.usersGet({
      email: restApiUtils.operators.equals(email),
      limit: "1",
    });

    if (!initiatingUser) {
      return { error: "scan not possible" };
    }

    const scanId = restApiUtils.generateUUID();
    await scans.scansPost({
      scans: {
        id: scanId,
        initiatingUserId: initiatingUser.id,
        createdAt: restApiUtils.now(),
      },
    });

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
