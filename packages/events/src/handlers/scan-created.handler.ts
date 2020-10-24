import { SQSRecord } from "aws-lambda";
import { Context } from "../services/context.service";
import { Services } from "../services/service-provider";
import { getAttributeFromMessage } from "../utils/getAttributeFromMessage";

export const $ScanCreatedHandler = ({
  context,
  issueDiscoveredQueue,
  issueContainerDiscoveredQueue,
  services,
}: {
  context: Context;
  services: Services;

  issueDiscoveredQueue: string;
  issueContainerDiscoveredQueue: string;
}) => {
  async function fetchAllIssues({ api, issueContainerId, logger }) {
    async function fetchIssuesPage(page: number, limit: number = 50) {
      logger.info({
        msg: "fetching issues",
        page,
        limit,
      });
      const issues = await api.get(
        `/issues/v1/containers/${issueContainerId}/quality-issues`,
        {
          params: {
            "page[limit]": limit,
            "page[offset]": page * limit,
          },
        }
      );

      const issueCount = issues.meta.record_count;

      if ((page + 1) * limit < issueCount) {
        return issues.data.concat(await fetchIssuesPage(page + 1));
      } else {
        return issues.data;
      }
    }

    return fetchIssuesPage(0);
  }

  async function processIssueContainer({ issueContainerId, scanId }) {
    const { logger } = context;
    const { sqs } = services;

    logger.info({
      msg: "issue container discovered",
      issueContainerId,
    });

    await sqs.sendMessage({
      queue: issueContainerDiscoveredQueue,
      message: {
        type: "IssueContainerDiscovered",
        scanId,
        issueContainerId,
      },
    });
  }

  async function processIssues({
    api,
    project,
    scanId,
    issueContainerId,
    hubId,
  }) {
    const { logger } = context;
    const { sqs } = services;
    try {
      const issues = await fetchAllIssues({
        api,
        issueContainerId,
        logger,
      });

      for (const issue of issues) {
        logger.info({
          msg: "issue discovered",
          issueId: issue.id,
          scanId,
          issueContainerId,
          hubId,
        });
      }

      if (shouldEmitMessages) {
        await sqs.sendMessagesBatch({
          queue: issueDiscoveredQueue,
          messages: issues.map((issue) => ({
            type: "IssueDiscovered",
            scanId,
            issueId: issue.id,
            projectId: project.id,
            issueContainerId,
            hubId,
          })),
        });
      }

      logger.info({
        issuesDiscovered: issues.length,
        hubId,
        projectId: project.id,
      });
    } catch (e) {
      logger.error({
        ...e,
        msg: "failed discovering all issues",
      });
    }
  }

  return async function scanCreatedHandler({
    message,
  }: {
    message: SQSRecord;
  }) {
    const { logger } = context;
    const { bimApiFactory } = services;

    const scanId = getAttributeFromMessage(message, "scanId");
    const hubId = getAttributeFromMessage(message, "hubId");
    const projectId = getAttributeFromMessage(message, "projectId");

    logger.context({ scanId, hubId, projectId });

    const api = await bimApiFactory({ scanId });

    const { data: project } = await api.get<any, any>(
      `/project/v1/hubs/${hubId}/projects/${projectId}`
    );

    const issueContainerId = project.relationships.issues.data.id;
    logger.context({ issueContainerId });

    await Promise.all([
      processIssueContainer({ issueContainerId, scanId }),
      processIssues({
        api,
        hubId,
        issueContainerId,
        project,
        scanId,
      }),
    ]);
  };
};
