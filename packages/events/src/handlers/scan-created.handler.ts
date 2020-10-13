import { SQSRecord } from "aws-lambda";
import { Context } from "../services/context.service";
import { Services } from "../services/service-provider";

type DataManagementAPI_GetHubs = any;
type BIM360API_GetProjects = any;

export const $ScanCreatedHandler = ({
  context,
  issueDiscoveredQueue,
  issueContainerDiscoveredQueue,
  shouldEmitMessages,
  services,
}: {
  context: Context;
  services: Services;

  issueDiscoveredQueue: string;
  issueContainerDiscoveredQueue: string;
  shouldEmitMessages: boolean;
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

  return async function scanCreatedHandler({
    message,
  }: {
    message: SQSRecord;
  }) {
    const { logger } = context;
    const { sqs, bimApiFactory, getTokenFromScanId } = services;

    const { stringValue: scanId = "" } = message.messageAttributes.scanId;

    const token = await getTokenFromScanId(scanId);

    const api = bimApiFactory({ token });

    try {
      const hubs = await api.get<
        DataManagementAPI_GetHubs,
        DataManagementAPI_GetHubs
      >("/project/v1/hubs");

      for (const hub of hubs.data) {
        const projects = await api.get<
          BIM360API_GetProjects,
          BIM360API_GetProjects
        >(`/project/v1/hubs/${hub.id}/projects`);

        for (const project of projects.data) {
          const issueContainerId = project.relationships.issues.data.id;

          logger.info({
            msg: "issue container discovered",
            issueContainerId,
          });

          if (shouldEmitMessages) {
            await sqs.sendMessage({
              queue: issueContainerDiscoveredQueue,
              message: {
                type: "IssueContainerDiscovered",
                scanId,
                issueContainerId,
                projectId: project.id,
                hubId: hub.id,
              },
            });
          }

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
                hubId: hub.id,
              });
            }

            if (shouldEmitMessages) {
              await sqs.sendMessagesBatch({
                queue: issueDiscoveredQueue,
                messages: issues.map((issue) => ({
                  type: "IssueDiscovered",
                  scanId,
                  issueId: issue.id,
                  issueContainerId,
                  hubId: hub.id,
                })),
              });
            }

            logger.info({
              issuesDiscovered: issues.length,
              hubId: hub.id,
              projectID: project.id,
            });
          } catch (e) {
            logger.error({
              ...e,
              msg: "failed discovering all issues",
            });
          }
        }
      }
    } catch (e) {
      logger.error({
        ...e,
        msg: "failed to initiate scan",
      });
    }

    logger.info("scan complete");
  };
};
