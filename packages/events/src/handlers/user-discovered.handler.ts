import { SQSRecord } from "aws-lambda";
import { Context } from "../services/context.service";
import { getAttributeFromMessage } from "../utils/getAttributeFromMessage";
import last from "lodash/last";
import isEmpty from "lodash/isEmpty";

type BIM360API_GetUser = any;

export const $UserDiscoveredHandler = ({ context }: { context: Context }) => {
  const { db } = context;
  async function updateUserDetails(userData: any) {
    const user = await db("events.users")
      .select()
      .where({ provider_id: userData.id });

    if (isEmpty(user)) {
      await db("events.users").insert({
        provider_id: userData.id,
        email: userData.email,
        first_name: userData.first_name,
        last_name: userData.last_name,
        profile_img_url: userData.image_url,
        scanned_at: db.fn.now(),
      });
    } else {
      await db("events.users")
        .update({
          email: userData.email,
          first_name: userData.first_name,
          last_name: userData.last_name,
          profile_img_url: userData.image_url,
          scanned_at: db.fn.now(),
          modified_at: db.fn.now(),
        })
        .where({ provider_id: userData.id });
    }
  }

  return async function userDiscoveredHandler({
    message,
  }: {
    message: SQSRecord;
  }) {
    const { logger, bimApiFactory, generateTemporaryAPIToken } = context;
    const userProviderId = getAttributeFromMessage(message, "userProviderId");
    const scanId = getAttributeFromMessage(message, "scanId");
    const hubId = getAttributeFromMessage(message, "hubId");

    logger.info("generating temporary token");

    const token = await generateTemporaryAPIToken();
    const api = bimApiFactory({ token });

    const accountId = last(hubId.split("b."));

    logger.info("fetching user details");

    const user = await api.get<BIM360API_GetUser, BIM360API_GetUser>(
      `/hq/v1/accounts/${accountId}/users/${userProviderId}`
    );

    await updateUserDetails(user);

    logger.info({
      msg: "user details fetched",
      userProviderId,
      scanId,
    });
  };
};
