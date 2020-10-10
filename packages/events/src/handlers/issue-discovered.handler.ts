import { IssueCustomAttributesApi, IssuesApi } from "@bimdive/rest-api-client";
import { SQSRecord } from "aws-lambda";
import { Context } from "../services/context.service";
import { Services } from "../services/service-provider";
import { getAttributeFromMessage } from "../utils/getAttributeFromMessage";

type BIM360API_GetIssue = any;

export type IssueDiscoveredHandler = (params: {
  message: SQSRecord;
}) => Promise<void>;

export const $IssueDiscoveredHandler = ({
  context,
  userDiscoveredQueue,
  services,
}: {
  context: Context;
  userDiscoveredQueue: string;
  services: Services;
}): IssueDiscoveredHandler => {
  async function persistIssueCustomAttributes(
    issueProviderId: string,
    attributes
  ) {
    const { logger } = context;
    const { restApiUtils } = services;

    const issueCustomAttributes = new IssueCustomAttributesApi(
      restApiUtils.configuration
    );

    for (const customAttribute of attributes) {
      logger.info({
        msg: "custom attribute found",
        id: customAttribute.id,
        issueProviderId,
      });

      const [existing] = await issueCustomAttributes.issueCustomAttributesGet({
        limit: "1",
        customAttributeProviderId: restApiUtils.operators.equals(
          customAttribute.id
        ),
        issueProviderId: restApiUtils.operators.equals(issueProviderId),
      });

      logger.debug({
        msg: existing ? "updating" : "adding",
        id: existing?.id || restApiUtils.generateUUID(),
        customAttributeProviderId: customAttribute.id,
        issueProviderId: issueProviderId,
        type: customAttribute.type,
        value: customAttribute.value,
        scannedAt: restApiUtils.now(),
      });

      await issueCustomAttributes.issueCustomAttributesPost({
        issueCustomAttributes: {
          id: existing?.id || restApiUtils.generateUUID(),
          customAttributeProviderId: customAttribute.id,
          issueProviderId: issueProviderId,
          type: customAttribute.type,
          value: customAttribute.value,
          scannedAt: restApiUtils.now(),
        },
      });

      logger.info({
        msg: "issue custom attribute saved",
        issueProviderId,
        customAttributeProviderId: customAttribute.id,
      });
    }
  }

  async function persistIssue(issue, issueContainerId: string) {
    const { logger } = context;
    const { restApiUtils } = services;
    const issues = new IssuesApi(restApiUtils.configuration);

    const [existing] = await issues.issuesGet({
      providerId: restApiUtils.operators.equals(issue.id),
    });

    await issues.issuesPost({
      issues: {
        id: existing?.id || restApiUtils.generateUUID(),
        providerId: issue.id,
        type: "",
        subType: "",
        issueContainerProviderId: issueContainerId,
        status: issue.attributes.status,
        title: issue.attributes.title,
        dueDate: issue.attributes.due_date,
        assignedTo: issue.attributes.assigned_to,
        assignedToType: issue.attributes.assigned_to_type,
        scannedAt: restApiUtils.now(),
      },
    });

    logger.info({
      msg: "saved issue",
      providerId: issue.id,
    });
  }

  return async function issueDiscoveredHandler({
    message,
  }: {
    message: SQSRecord;
  }) {
    const { logger } = context;
    const { bimApiFactory, getTokenFromScanId, sqs } = services;

    const scanId = getAttributeFromMessage(message, "scanId");
    const issueId = getAttributeFromMessage(message, "issueId");
    const issueContainerId = getAttributeFromMessage(
      message,
      "issueContainerId"
    );
    const hubId = getAttributeFromMessage(message, "hubId");

    logger.info({
      msg: "issue discovered",
      scanId,
      issueId,
    });

    const token = await getTokenFromScanId(scanId);

    logger.debug({
      msg: "token found",
      token,
      scanId,
    });

    const api = bimApiFactory({ token });

    const { data: issue } = await api.get<
      BIM360API_GetIssue,
      BIM360API_GetIssue
    >(`/issues/v1/containers/${issueContainerId}/quality-issues/${issueId}`);

    if (
      issue.attributes.assigned_to &&
      issue.attributes.assigned_to_type === "user"
    ) {
      logger.info({
        msg: "user discovered",
        id: issue.attributes.assigned_to,
        hubId,
      });

      await sqs.sendMessage({
        queue: userDiscoveredQueue,
        message: {
          type: "UserDiscovered",
          userProviderId: issue.attributes.assigned_to,
          scanId,
          hubId,
        },
      });
    }

    await persistIssueCustomAttributes(
      issue.id,
      issue.attributes.custom_attributes
    );

    await persistIssue(issue, issueContainerId);
  };
};
