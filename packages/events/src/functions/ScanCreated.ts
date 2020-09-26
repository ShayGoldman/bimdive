import { SQSEvent, SQSHandler } from "aws-lambda";
import "source-map-support/register";
import { $Context } from "../services/context.service";

type DataManagementAPI_GetHubs = any;
type BIM360API_GetProjects = any;
type BIM360API_GetIssues = any;

export const handle: SQSHandler = async (event: SQSEvent) => {
  const { logger, sqs, bimApiFactory, getTokenFromScanId } = await $Context();
  const recordCount = event.Records.length;
  logger.debug(`Recieved ${recordCount} record/s`);

  const issueDiscoveredQueue = process.env.QUEUE_ISSUE_DISCOVERED;

  if (!issueDiscoveredQueue) {
    throw new Error("No queue supplied for IssueDiscovered messages");
  }

  const {
    stringValue: scanId = "",
  } = event.Records[0].messageAttributes.scanId;

  const token = await getTokenFromScanId(scanId);

  const api = await bimApiFactory({ token });

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
          `Found ${issueCount} issues, but only fetch the first ${issueLimit}`
        );
      }

      for (const issue of issues.data) {
        logger.info({
          msg: "Issue discovered",
          issueId: issue.id,
        });

        if (process.env.NODE_ENV === "prod") {
          await sqs.sendMessage({
            queue: issueDiscoveredQueue,
            message: {
              type: "IssueDiscovered",
              scanId,
              issueId: issue.id,
              issueContainerId,
              projectId: project.id,
              hubId: hub.id,
            },
          });
        }
      }
    }

    logger.info({
      msg: "Scan complete",
    });

    if (process.env.NODE_ENV === "development") {
      process.exit(0);
    }
  }
};
