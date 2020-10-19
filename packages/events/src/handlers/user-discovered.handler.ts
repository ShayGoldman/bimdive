import { UsersApi } from "@bimdive/rest-api-client";
import { SQSRecord } from "aws-lambda";
import last from "lodash/last";
import dayjs from "dayjs";
import { Context } from "../services/context.service";
import { Services } from "../services/service-provider";
import { getAttributeFromMessage } from "../utils/getAttributeFromMessage";

type BIM360API_GetUser = any;

export const $UserDiscoveredHandler = ({
  context,
  services,
  userDiscoveredFreshness,
}: {
  context: Context;
  services: Services;
  userDiscoveredFreshness: number;
}) => {
  const { restApiUtils } = services;
  const users = new UsersApi(restApiUtils.configuration);

  async function persistUserDetails(userId: string, userData: any) {
    await users.usersPost({
      users: {
        id: userId,
        providerId: userData.uid,
        email: userData.email,
        firstName: userData.first_name,
        lastName: userData.last_name,
        profileImgUrl: userData.image_url,
        scannedAt: restApiUtils.now(),
        modifiedAt: restApiUtils.now(),
        createdAt: restApiUtils.now(),
      },
    });
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

    const [existing] = await users.usersGet({
      providerId: restApiUtils.operators.equals(userProviderId),
    });

    const wasScannedLately =
      existing &&
      existing.scannedAt &&
      dayjs(Date.now())
        .subtract(userDiscoveredFreshness, "minute")
        .isBefore(existing.scannedAt);

    if (wasScannedLately) {
      logger.info({
        msg: "user was recently scanned, terminating",
        userProviderId,
      });
      return;
    }

    const user = await api.get<BIM360API_GetUser, BIM360API_GetUser>(
      `/hq/v1/accounts/${accountId}/users/${userProviderId}`
    );

    await persistUserDetails(existing?.id || restApiUtils.generateUUID(), user);

    logger.info({
      msg: "user details saved",
      userProviderId,
      scanId,
    });
  };
};
