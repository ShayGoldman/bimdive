import { Context as SQSContext, SQSEvent, SQSRecord } from "aws-lambda";
import { $Context } from "../../services/context.service";

type Handler = (params: { message: SQSRecord }) => Promise<void>;

type Factory = () => Handler;

type RuntimeDeps = {
  factory: Factory;
  apiContext: SQSContext;
};

type SQSRuntimeFactory = {
  create: (params: RuntimeDeps) => Promise<SQSRuntime>;
};

export type SQSRuntime = (params: { event: SQSEvent }) => Promise<void>;

export const $SQSRuntimeFactory = (): SQSRuntimeFactory => {
  const context = $Context();

  return {
    create: async ({ factory, apiContext }: RuntimeDeps) => {
      apiContext.callbackWaitsForEmptyEventLoop = false;

      const { logger, environment } = context;
      const handler = factory();

      return async function sqsRuntime({ event }: { event: SQSEvent }) {
        const messages = event.Records.map((m) => m.messageId);

        logger.info({
          msg: "event recieved",
          messages,
          requestId: apiContext.awsRequestId,
          environment,
        });

        try {
          for (const message of event.Records) {
            logger.info({
              msg: "message found",
              messageId: message.messageId,
              source: message.eventSource,
            });
            await handler({ message });
            logger.info({
              msg: "message handled",
              messageId: message.messageId,
            });
          }
          logger.info({
            msg: "event handled",
            requestId: apiContext.awsRequestId,
            messages,
          });
        } catch (e) {
          logger.error(e);
        } finally {
          // nasty serverless bug that causes local invocations to hang
          if (process.env.IS_LOCAL) {
            process.exit(0);
          }
        }
      };
    },
  };
};
