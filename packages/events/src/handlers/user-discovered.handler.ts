import { SQSRecord } from "aws-lambda";
import { Context } from "../services/context.service";
import { getAttributeFromMessage } from "../utils/getAttributeFromMessage";
import last from "lodash/last";
import isEmpty from "lodash/isEmpty";
import { Services } from "../services/service-provider";

type BIM360API_GetUser = any;

export const $UserDiscoveredHandler = ({
  context,
  services,
}: {
  context: Context;
  services: Services;
}) => {
  const { db } = services;
  async function updateUserDetails(userData: any) {
    // autodesk's user id
    const userId = userData.uid;

    const user = await db("events.users")
      .select()
      .where({ provider_id: userId });

    if (isEmpty(user)) {
      await db("events.users").insert({
        provider_id: userId,
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
        .where({ provider_id: userId });
    }
  }

  return async function userDiscoveredHandler({
    message,
  }: {
    message: SQSRecord;
  }) {
    const { bimApiFactory, generateTemporaryAPIToken } = services;
    const { logger } = context;

    const userProviderId = getAttributeFromMessage(message, "userProviderId");
    const scanId = getAttributeFromMessage(message, "scanId");
    const hubId = getAttributeFromMessage(message, "hubId");

    logger.info("generating temporary token");

    const token = await generateTemporaryAPIToken();
    const api = bimApiFactory({ token });

    const accountId = last(hubId.split("b."));

    logger.info({ msg: "fetching user details", userProviderId });

    const user = await api.get<BIM360API_GetUser, BIM360API_GetUser>(
      `/hq/v1/accounts/${accountId}/users/${userProviderId}`
    );

    logger.debug(user);
    await updateUserDetails(user);

    logger.info({
      msg: "user details fetched",
      userProviderId,
      scanId,
    });
  };
};
