import { APIGatewayProxyEvent } from "aws-lambda";
import { Context } from "../../services/context.service";

export const $CreateScan = ({ context }: { context: Context }) => {
  return async function createScan({ event }: { event: APIGatewayProxyEvent }) {
    const { logger } = context;
    logger.info(event);

    // todo figure out event structure (at least userId)
    // todo create scan object
    // todo send message to ScanCreatedQueue
    return { data: { foo: "bar" } };
  };
};
