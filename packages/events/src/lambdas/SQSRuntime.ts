import { SQSEvent, SQSRecord } from "aws-lambda";
import { Context } from "../services/context.service";

type Params = {
  event: SQSEvent;
  handler: <OtherParams>(
    params: { message: SQSRecord } & OtherParams
  ) => Promise<void>;
};

export type SQSRuntime = (params: Params) => Promise<void>;

export const $SQSRuntime = ({ context }: { context: Context }): SQSRuntime => {
  return async function sqsRuntime({ event, handler }: Params) {
    const { logger } = context;
    const messages = event.Records.map((m) => m.messageId);

    logger.info({
      msg: "Event recieved",
      messages,
    });

    try {
      for (const message of event.Records) {
        await handler({ message });
        logger.info({
          msg: "Message handled",
          messageId: message.messageId,
        });
      }
    } catch (e) {
      logger.error(e);
    } finally {
      logger.info({
        msg: "Event handled",
        messages,
      });
      // nasty serverless bug that causes to hang
      if (process.env.NODE_ENV === "development") {
        process.exit(0);
      }
    }
  };
};
