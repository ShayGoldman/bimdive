import { SQSEvent, SQSRecord, Context as SQSContext } from "aws-lambda";
import { $Context, Context } from "../../services/context.service";
import { $ServiceProvider, Services } from "../../services/service-provider";

type Handler = (params: { message: SQSRecord }) => Promise<void>;

type Factory = (params: { context: Context; services: Services }) => Handler;

type CreateParams = {
  factory: Factory;
  apiContext: SQSContext;
};

type SQSRuntimeFactory = {
  create: (params: CreateParams) => Promise<SQSRuntime>;
};

export type SQSRuntime = (params: { event: SQSEvent }) => Promise<void>;

export const $SQSRuntimeFactory = (): SQSRuntimeFactory => {
  const context = $Context();
  const servicesPromise = $ServiceProvider({ context });

  return {
    create: async ({ factory, apiContext }: CreateParams) => {
      apiContext.callbackWaitsForEmptyEventLoop = false;
      const services = await servicesPromise;

      const { logger, environment } = context;
      const handler = factory({ context, services });

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
