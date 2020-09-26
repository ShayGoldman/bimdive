import { SQSEvent, SQSHandler } from "aws-lambda";
import "source-map-support/register";
import { $Context } from "../services/context.service";

type BIM360API_GetIssue = any;

export const handle: SQSHandler = async (event: SQSEvent) => {
  const { getTokenFromScanId, bimApiFactory, logger } = await $Context();

  const recordCount = event.Records.length;
  logger.debug(`Recieved ${recordCount} record/s`);

  for (const record of event.Records) {
    const { stringValue: scanId = "" } = record.messageAttributes.scanId;

    const { stringValue: issueId = "" } = record.messageAttributes.issueId;

    const {
      stringValue: issueContainerId = "",
    } = record.messageAttributes.issueContainerId;

    logger.info({
      msg: "IssueDiscovered",
      scanId,
      issueId,
    });

    const token = await getTokenFromScanId(scanId);

    logger.debug({
      msg: "Token found",
      token,
      scanId,
      issueId,
    });

    const api = await bimApiFactory({ token });

    const issue = await api.get<BIM360API_GetIssue, BIM360API_GetIssue>(
      `/issues/v1/containers/${issueContainerId}/quality-issues/${issueId}`
    );

    console.log(/* LOG */ "---", "issue", issue.data);
    console.log(
      /* LOG */ "---",
      "issue",
      issue.data.attributes.custom_attributes
    );

    // todo /issues/v2/containers/:containerId/issue-attribute-definitions

    // await db("etl.issues").insert({
    //   provider_id: issue.id,
    //   type: type?.title || "",
    //   sub_type: subType?.title || "",
    //   ...pick(
    //     issue.attributes,
    //     "status",
    //     "title",
    //     "due_date",
    //     "assigned_to",
    //     "assigned_to_type"
    //   ),
    // });

    logger.debug({
      msg: "Issue fetched",
      issueId: issue.id,
    });

    if (process.env.NODE_ENV === "development") {
      process.exit(0);
    }
  }
};
