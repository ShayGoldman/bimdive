import { APIGatewayProxyEvent } from "aws-lambda";
import dayjs from "dayjs";
import { Context } from "../../services/context.service";
import { Services } from "../../services/service-provider";

export const $AuthenticateUser = ({
  context,
  services,
}: {
  context: Context;
  services: Services;
}) => {
  const { logger } = context;
  const { bimApiFactory, db } = services;
  const api = bimApiFactory({});

  async function getUserData(token: string): Promise<any> {
    const response = await api.get("/userprofile/v1/users/@me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  }

  async function updateUserAccessToken(token: any): Promise<void> {
    try {
      await db("events.access_tokens").insert(token);
    } catch (e) {
      logger.warn(e);
      await db("events.access_tokens")
        .update(token)
        .where({ user_provider_id: token.user_provider_id });
    }
  }

  async function updateUserData(userData: any): Promise<any> {
    try {
      const [id] = await db("events.users").insert(userData, "id");
      return id;
    } catch (e) {
      logger.warn(e);
      const [id] = await db("events.users").update(userData, "id").where({
        provider_id: userData.provider_id,
        modified_at: new Date().toUTCString(),
      });
      return id;
    }
  }

  return async function authenticateUser({
    event,
  }: {
    event: APIGatewayProxyEvent;
  }) {
    const { logger } = context;

    const { access_token, refresh_token, expires_in, code } = JSON.parse(
      event.body || "{}"
    );

    if (!access_token) {
      return { error: "error authenticating user" };
    }

    try {
      const issuedAt = new Date().toUTCString();

      const userData = await getUserData(access_token);

      logger.debug({
        msg: "user data fetched",
        ...userData,
      });

      const userProviderId = userData.userId;

      await updateUserAccessToken({
        user_provider_id: userProviderId,
        access_token: access_token,
        refresh_token: refresh_token,
        issued_at: issuedAt,
        expires_at: dayjs(issuedAt)
          .add(expires_in, "second")
          .toDate()
          .toISOString(),
      });

      const userId = await updateUserData({
        provider_id: userProviderId,
        email: userData.emailId,
        first_name: userData.firstName,
        last_name: userData.lastName,
        profile_img_url: userData.profileImages.sizeX240,
      });

      logger.info({
        msg: "successfully authenticated user",
        userProviderId,
      });

      return { data: { id: userId } };
    } catch (e) {
      logger.error(e);
      return { error: e.message };
    }
  };
};
