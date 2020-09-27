import { SQSRecord } from "aws-lambda";
import get from "lodash/get";

export function getAttributeFromMessage(
  message: SQSRecord,
  attribteName: string
) {
  const attribute = get(message.attributes, attribteName);
  return attribute ? attribute.stringValue : "";
}
