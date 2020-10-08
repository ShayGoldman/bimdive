import { SQSRecord } from "aws-lambda";
import { Context } from "../services/context.service";
import { Services } from "../services/service-provider";
import { getAttributeFromMessage } from "../utils/getAttributeFromMessage";

type BIM360API_GetCustomAttributes = any;

export const $IssueContainerDiscoveredHandler = ({
  context,
  services,
}: {
  context: Context;
  services: Services;
}) => {
  async function persistCustomAttributes(customAttributes) {
    const { logger } = context;
    const { db } = services;

    for (const {
      id,
      containerId,
      title,
      dataType,
      description,
      createdAt,
      updatedAt,
      deletedAt,
    } of customAttributes.results) {
      try {
        const res = await db("events.custom_attributes")
          .update({
            issue_container_provider_id: containerId,
            type: dataType,
            title,
            description,
            created_at: createdAt,
            updated_at: updatedAt,
            deleted_at: deletedAt,
            scanned_at: db.fn.now(),
          })
          .where({ provider_id: id });

        if (res === 0) {
          throw new Error("failed update, reverting to insert");
        }
      } catch (e) {
        logger.debug(e);
        await db("events.custom_attributes").insert({
          provider_id: id,
          issue_container_provider_id: containerId,
          type: dataType,
          title,
          description,
          created_at: createdAt,
          updated_at: updatedAt,
          deleted_at: deletedAt,
          scanned_at: db.fn.now(),
        });
      }
    }
  }

  return async function issueContainerDiscoveredHandler({
    message,
  }: {
    message: SQSRecord;
  }) {
    const { logger } = context;
    const { bimApiFactory, getTokenFromScanId } = services;
    const scanId = getAttributeFromMessage(message, "scanId");
    const issueContainerId = getAttributeFromMessage(
      message,
      "issueContainerId"
    );

    logger.info({
      msg: "issue container discovered",
      scanId,
      issueContainerId,
    });

    const token = await getTokenFromScanId(scanId);

    logger.debug({
      msg: "token found",
      token,
      scanId,
    });

    const api = bimApiFactory({ token });

    const customAttributes = await api.get<
      BIM360API_GetCustomAttributes,
      BIM360API_GetCustomAttributes
    >(`/issues/v2/containers/${issueContainerId}/issue-attribute-definitions`);

    logger.info({
      msg: "found custom attributes",
      count: customAttributes.length,
    });

    await persistCustomAttributes(customAttributes);
  };
};
