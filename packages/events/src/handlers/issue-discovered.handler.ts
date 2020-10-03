import { SQSRecord } from "aws-lambda";
import pick from "lodash/pick";
import { Context } from "../services/context.service";
import { getAttributeFromMessage } from "../utils/getAttributeFromMessage";

type BIM360API_GetIssue = any;

export type IssueDiscoveredHandler = (params: {
  message: SQSRecord;
}) => Promise<void>;

export const $IssueDiscoveredHandler = ({
  context,
}: {
  context: Context;
}): IssueDiscoveredHandler => {
  return async function issueDiscoveredHandler({
    message,
  }: {
    message: SQSRecord;
  }) {
    const { logger, bimApiFactory, getTokenFromScanId, db } = context;
    const scanId = getAttributeFromMessage(message, "scanId");
    const issueId = getAttributeFromMessage(message, "issueId");
    const issueContainerId = getAttributeFromMessage(
      message,
      "issueContainerId"
    );

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

    const issue = await api.get<BIM360API_GetIssue, BIM360API_GetIssue>(
      `/issues/v1/containers/${issueContainerId}/quality-issues/${issueId}`
    );

    try {
      await db("events.issues").insert({
        provider_id: issue.id,
        type: "",
        issue_container_id: issueContainerId,
        sub_type: "",
        ...pick(
          issue.attributes,
          "status",
          "title",
          "due_date",
          "assigned_to",
          "assigned_to_type"
        ),
      });
    } catch (e) {
      await db("events.issues")
        .update({
          type: "",
          issue_container_id: issueContainerId,
          sub_type: "",
          ...pick(
            issue.attributes,
            "status",
            "title",
            "due_date",
            "assigned_to",
            "assigned_to_type"
          ),
          scanned_at: db.fn.now(),
        })
        .where({ provider_id: issue.id });
    }
  };
};
