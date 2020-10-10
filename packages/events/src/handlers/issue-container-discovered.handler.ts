import { SQSRecord } from "aws-lambda";
import { Context } from "../services/context.service";
import { Services } from "../services/service-provider";
import { getAttributeFromMessage } from "../utils/getAttributeFromMessage";
import { CustomAttributesApi } from "@bimdive/rest-api-client";

type BIM360API_GetCustomAttributes = any;

export const $IssueContainerDiscoveredHandler = ({
  context,
  services,
}: {
  context: Context;
  services: Services;
}) => {
  async function persistCustomAttributes({ results }) {
    const { logger } = context;
    const { restApiUtils } = services;

    const customAttributes = new CustomAttributesApi(
      restApiUtils.configuration
    );

    for (const {
      id,
      containerId,
      title,
      dataType,
      metadata,
      description,
      createdAt,
      updatedAt,
      deletedAt,
    } of results) {
      const attributes = dataType === "list" ? metadata.list.options : [{}];

      for (const { value = null, id: valueId = null } of attributes) {
        const [existingAttribute] = await customAttributes.customAttributesGet({
          limit: "1",
          providerId: restApiUtils.operators.equals(id),
          valueId: valueId
            ? restApiUtils.operators.equals(valueId)
            : restApiUtils.operators.null(),
        });

        await customAttributes.customAttributesPost({
          customAttributes: {
            id: existingAttribute?.id || restApiUtils.generateUUID(),
            providerId: id,
            issueContainerProviderId: containerId,
            type: dataType,
            title,
            description,
            value,
            valueId: valueId,
            createdAt: createdAt,
            updatedAt: updatedAt,
            deletedAt: deletedAt,
            scannedAt: restApiUtils.now(),
          },
        });
        logger.info({
          msg: "attribute saved",
          providerId: id,
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

    try {
      await persistCustomAttributes(customAttributes);
    } catch (e) {
      logger.error(e);
    }
  };
};
