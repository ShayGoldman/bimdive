import { SQSEvent, SQSRecord } from "aws-lambda";
import { $Context, Context } from "../../services/context.service";

type Handler = (params: { message: SQSRecord }) => Promise<void>;

export type SQSRuntime = (params: { event: SQSEvent }) => Promise<void>;

export const $SQSRuntimeFactory = (): {
  create: (params: {
    factory: (params: { context: Context }) => Handler;
  }) => Promise<SQSRuntime>;
} => {
  const contextPromise = $Context();

  return {
    create: async ({
      factory,
    }: {
      factory: (params: { context: Context }) => Handler;
    }) => {
      const context = await contextPromise;

      const { logger, environment } = context;
      const handler = factory({ context });

      return async function sqsRuntime({ event }: { event: SQSEvent }) {
        const messages = event.Records.map((m) => m.messageId);

        logger.info({
          msg: "event recieved",
          messages,
          environment,
        });

        try {
          for (const message of event.Records) {
            await handler({ message });
            logger.info({
              msg: "message handled",
              messageId: message.messageId,
            });
          }
          logger.info({
            msg: "event handled",
            messages,
          });
        } catch (e) {
          logger.error(e);
        } finally {
          // nasty serverless bug that causes to hang
          if (process.env.NODE_ENV === "test") {
            process.exit(0);
          }
        }
      };
    },
  };
};
