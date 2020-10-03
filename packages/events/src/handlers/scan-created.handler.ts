import { SQSRecord } from "aws-lambda";
import { Context } from "../services/context.service";

type DataManagementAPI_GetHubs = any;
type BIM360API_GetProjects = any;
type BIM360API_GetIssues = any;

export const $ScanCreatedHandler = ({
  context,
  issueDiscoveredQueue,
  issueContainerDiscoveredQueue,
  shouldEmitMessages,
}: {
  context: Context;
  issueDiscoveredQueue: string;
  issueContainerDiscoveredQueue: string;
  shouldEmitMessages: boolean;
}) => {
  return async function scanCreatedHandler({
    message,
  }: {
    message: SQSRecord;
  }) {
    const { logger, sqs, bimApiFactory, getTokenFromScanId } = context;

    const { stringValue: scanId = "" } = message.messageAttributes.scanId;

    const token = await getTokenFromScanId(scanId);

    const api = bimApiFactory({ token });

    const issueLimit = 100;

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

        const issues = await api.get<BIM360API_GetIssues, BIM360API_GetIssues>(
          `/issues/v1/containers/${issueContainerId}/quality-issues`,
          {
            params: {
              "page[limit]": issueLimit,
            },
          }
        );

        const issueCount = issues.meta.record_count;

        if (issueCount > issueLimit) {
          logger.warn(
            `found ${issueCount} issues, but only fetch the first ${issueLimit}`
          );
        }

        for (const issue of issues.data) {
          logger.info({
            msg: "issue discovered",
            issueId: issue.id,
            scanId,
            issueContainerId,
            hubId: hub.id,
          });

          if (shouldEmitMessages) {
            await sqs.sendMessage({
              queue: issueDiscoveredQueue,
              message: {
                type: "IssueDiscovered",
                scanId,
                issueId: issue.id,
                issueContainerId,
                hubId: hub.id,
              },
            });
          }
        }
      }

      logger.info("scan complete");
    }
  };
};
