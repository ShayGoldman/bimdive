import AWS from "aws-sdk";
import { getFromEnv } from "../utils/getFromEnv";
import { Logger } from "./logger.service";

AWS.config.update({ region: getFromEnv("AWS_SQS_REGION") || "eu-west-2" });

type Deps = {
  logger: Logger;
};

type Message = { type: string } & { [key: string]: string | number };
type SendMessageParams = {
  queue: string;
  message: Message;
};

export type SQS = {
  sendMessage: (params: SendMessageParams) => Promise<void>;
};

export const $SQS = ({ logger }: Deps): SQS => {
  const sqs = new AWS.SQS({ apiVersion: "2012-11-05" });
  function messageToMessageAttributesAdapter({
    type,
    ...attributes
  }: Message): AWS.SQS.MessageBodyAttributeMap {
    return Object.entries(attributes).reduce((out, [key, value]) => {
      if (typeof value === "string") {
        return { ...out, [key]: { DataType: "String", StringValue: value } };
      } else if (typeof value === "number") {
        return { ...out, [key]: { DataType: "Number", StringValue: value } };
      } else {
        logger.warn({
          msg: `encountered unknown message attribute, reverting to string`,
          key,
          type: typeof value,
          messageType: type,
        });
        return { ...out, [key]: { DataType: "String", StringValue: value } };
      }
    }, {});
  }

  async function sendMessage({ queue, message }: SendMessageParams) {
    const messageAttributes = messageToMessageAttributesAdapter(message);
    const params = {
      DelaySeconds: 10,
      MessageAttributes: messageAttributes,
      MessageBody: message.type,
      QueueUrl: queue,
    };

    const { MessageId } = await sqs.sendMessage(params).promise();
    logger.debug({
      msg: "message sent to queue",
      messageId: MessageId,
      queue,
    });
  }

  return {
    sendMessage,
  };
};
