import { SQSRecord } from "aws-lambda";
import { Context } from "../services/context.service";
import { Services } from "../services/service-provider";
import { getAttributeFromMessage } from "../utils/getAttributeFromMessage";

type BIM360API_GetIssue = any;

export const $IssueContainerDiscoveredHandler = ({
  context,
  services,
}: {
  context: Context;
  services: Services;
}) => {
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
      BIM360API_GetIssue,
      BIM360API_GetIssue
    >(`/issues/v2/containers/${issueContainerId}/issue-attribute-definitions`);

    console.log(/* LOG */ "---", "customAttributes", customAttributes);

    // await db("events.issues").insert({
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
  };
};
