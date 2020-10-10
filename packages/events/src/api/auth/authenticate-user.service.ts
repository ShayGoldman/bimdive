import { AccessTokensApi, UsersApi } from "@bimdive/rest-api-client";
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
  const { bimApiFactory } = services;
  const api = bimApiFactory({});

  async function getUserData(token: string): Promise<any> {
    const response = await api.get("/userprofile/v1/users/@me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  }

  async function updateUserAccessToken({
    userProviderId,
    ...token
  }: any): Promise<void> {
    const { logger } = context;
    const { restApiUtils } = services;
    const tokens = new AccessTokensApi(restApiUtils.configuration);

    const issuedAt = restApiUtils.now();
    const expiresAt = dayjs(issuedAt)
      .add(token.expires_in - 60, "second") // minus 60 for safety, doesn't really matter
      .toDate()
      .toUTCString();

    await tokens.accessTokensPost({
      accessTokens: {
        accessToken: token.access_token,
        expiresAt,
        issuedAt,
        refreshToken: token.refresh_token,
        userProviderId,
      },
    });

    logger.info({
      msg: "token saved",
      userProviderId,
    });
  }

  async function updateUserData(userData: any): Promise<any> {
    const { logger } = context;
    const { restApiUtils } = services;

    const users = new UsersApi(restApiUtils.configuration);

    const [existing] = await users.usersGet({
      providerId: restApiUtils.operators.equals(userData.provider_id),
      limit: "1",
    });

    const userId = existing?.id || restApiUtils.generateUUID();

    await users.usersPost({
      users: {
        id: userId,
        providerId: userData.userId,
        email: userData.emailId,
        firstName: userData.firstName,
        lastName: userData.lastName,
        profileImgUrl: userData.profileImages.sizeX240,
        modifiedAt: restApiUtils.now(),
        createdAt: existing?.createdAt || restApiUtils.now(),
      },
    });

    logger.info({
      msg: "user data saved",
      id: userId,
      providerId: userData.provider_id,
    });

    return userId;
  }

  return async function authenticateUser({
    event,
  }: {
    event: APIGatewayProxyEvent;
  }) {
    const { logger } = context;

    // code property too
    const { access_token, refresh_token, expires_in } = JSON.parse(
      event.body || "{}"
    );

    if (!access_token) {
      return { error: "error authenticating user" };
    }

    try {
      const userData = await getUserData(access_token);

      logger.debug({
        msg: "user data fetched",
        ...userData,
      });

      const userProviderId = userData.userId;

      await updateUserAccessToken({
        userProviderId,
        access_token,
        refresh_token,
        expires_in,
      });

      const userId = await updateUserData(userData);

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
