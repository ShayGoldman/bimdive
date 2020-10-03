import { SQSRecord } from "aws-lambda";
import get from "lodash/get";

export function getAttributeFromMessage(
  message: SQSRecord,
  attribteName: string
) {
  const attribute = get(message.messageAttributes, attribteName);
  return attribute?.stringValue || "";
}
