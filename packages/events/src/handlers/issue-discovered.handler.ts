import { IssueCustomAttributesApi, IssuesApi } from "@bimdive/rest-api-client";
import { SQSRecord } from "aws-lambda";
import compact from "lodash/compact";
import flatten from "lodash/flatten";
import omit from "lodash/omit";
import uniqBy from "lodash/uniqBy";
import { BIMApi } from "../services/bim-api-factory.service";
import { Context } from "../services/context.service";
import { Services } from "../services/service-provider";
import { getAttributeFromMessage } from "../utils/getAttributeFromMessage";

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
  async function getAllIssuesTypes({
    api,
    issueContainerProviderId,
  }: {
    api: BIMApi;
    issueContainerProviderId: string;
  }): Promise<{ types: any[]; subTypes: any[] }> {
    const { logger } = context;
    const { results: allIssueTypes } = await api.get<any, any>(
      `/issues/v1/containers/${issueContainerProviderId}/ng-issue-types`,
      {
        params: {
          include: "subtypes",
        },
      }
    );

    const types = allIssueTypes.map((i) => omit(i, "subtypes"));
    const subTypes = uniqBy(
      flatten(allIssueTypes.map(({ subtypes }) => subtypes)),
      ({ id }) => id
    );

    logger.info({
      msg: "found types & subtypes",
      types: types.length,
      subTypes: subTypes.length,
    });

    return {
      types,
      subTypes,
    };
  }

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

  async function persistIssue({ issue, types, subTypes, projectId }) {
    const { logger } = context;
    const { restApiUtils } = services;
    const issues = new IssuesApi(restApiUtils.configuration);

    const type =
      types.find(({ id }) => issue.attributes.ng_issue_type_id === id)?.title ||
      "";
    const subType =
      subTypes.find(({ id }) => issue.attributes.ng_issue_subtype_id === id)
        ?.title || "";

    const [existing] = await issues.issuesGet({
      providerId: restApiUtils.operators.equals(issue.id),
    });

    const issueId = existing?.id || restApiUtils.generateUUID();

    await issues.issuesPost({
      issues: {
        id: issueId,
        providerId: issue.id,
        type,
        subType,
        projectProviderId: projectId,
        status: issue.attributes.status,
        title: issue.attributes.title,
        dueDate: issue.attributes.due_date,
        ownedBy: issue.attributes.owner,
        assignedTo: issue.attributes.assigned_to,
        assignedToType: issue.attributes.assigned_to_type,
        scannedAt: restApiUtils.now(),
      },
    });

    logger.info({
      msg: "saved issue",
      id: issueId,
      providerId: issue.id,
    });
  }

  async function persistIssueComments(comments) {
    const { logger } = context;

    logger.debug({
      msg: "comments",
      comments,
    });
  }

  async function emitUserDiscoveredEvent({
    relation,
    userProviderId,
    scanId,
    hubId,
  }: {
    relation: string;
    scanId: string;
    hubId: string;
    userProviderId: string;
  }) {
    const { logger } = context;
    const { sqs } = services;

    logger.info({
      msg: "user found",
      relation,
      userProviderId,
      scanId,
    });
    await sqs.sendMessage({
      queue: userDiscoveredQueue,
      message: {
        type: "UserDiscovered",
        userProviderId,
        scanId,
        hubId,
      },
    });
  }

  return async function issueDiscoveredHandler({
    message,
  }: {
    message: SQSRecord;
  }) {
    const { logger } = context;
    const { bimApiFactory, getTokenFromScanId } = services;

    const scanId = getAttributeFromMessage(message, "scanId");
    const hubId = getAttributeFromMessage(message, "hubId");
    const projectId = getAttributeFromMessage(message, "projectId");
    const issueId = getAttributeFromMessage(message, "issueId");
    const issueContainerProviderId = getAttributeFromMessage(
      message,
      "issueContainerId"
    );

    logger.info({
      msg: "issue discovered",
      scanId,
      issueId,
      issueContainerProviderId,
    });

    const api = bimApiFactory({ token: await getTokenFromScanId(scanId) });

    const [{ data: issue }, { types, subTypes }] = await Promise.all([
      await api.get(
        `/issues/v1/containers/${issueContainerProviderId}/quality-issues/${issueId}`,
        {
          params: {
            include: "comments",
          },
        }
      ),
      await getAllIssuesTypes({
        api,
        issueContainerProviderId,
      }),
    ]);

    logger.debug({
      msg: "issue location description",
      issueId,
      location: issue.attributes.location_description,
    });

    await Promise.all(
      compact([
        emitUserDiscoveredEvent({
          relation: "owner",
          scanId,
          hubId,
          userProviderId: issue.attributes.owner,
        }),
        issue.attributes.assigned_to &&
          issue.attributes.assigned_to_type === "user" &&
          emitUserDiscoveredEvent({
            relation: "assigned_to",
            scanId,
            hubId,
            userProviderId: issue.attributes.assigned_to,
          }),
      ])
    );

    await persistIssueCustomAttributes(
      issue.id,
      issue.attributes.custom_attributes
    );

    await persistIssueComments(issue.relationships.comments.data);

    await persistIssue({
      issue,
      types,
      subTypes,
      projectId,
    });
  };
};
