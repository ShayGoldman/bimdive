import { ScansApi, UsersApi } from "@bimdive/rest-api-client";
import { APIGatewayProxyEvent } from "aws-lambda";
import { Context } from "../../services/context.service";
import { Services } from "../../services/service-provider";
import BBPromise from "bluebird";

export const $CreateProjectScans = ({
  context,
  scanCreatedQueue,
  services,
}: {
  context: Context;
  services: Services;
  scanCreatedQueue: string;
}) => {
  const { restApiUtils, sqs } = services;
  const scans = new ScansApi(restApiUtils.configuration);
  const { logger } = context;

  async function createProjectScan({ project, initiatingUser }) {
    const scanId = restApiUtils.generateUUID();
    const projectId = project.id;
    const hubId = project.relationships.hub.data.id;

    await scans.scansPost({
      scans: {
        id: scanId,
        initiatingUserId: initiatingUser.id,
        projectProviderId: projectId,
        projectName: project.attributes.name,
        createdAt: restApiUtils.now(),
      },
    });

    logger.info({
      msg: "scan created",
      initiatingUserId: initiatingUser.id,
      scanId,
      projectId: projectId,
      hubId,
    });

    await sqs.sendMessage({
      queue: scanCreatedQueue,
      message: {
        type: "ScanCreated",
        scanId,
        projectId,
        hubId,
      },
    });
  }

  return async function createProjectScans({
    event,
  }: {
    event: APIGatewayProxyEvent;
  }) {
    const { logger } = context;
    const { restApiUtils, bimApiFactory, tokens } = services;
    const users = new UsersApi(restApiUtils.configuration);
    const { userId } = JSON.parse(event.body || "{}");

    logger.info({
      msg: "scan requested",
      userId,
    });

    const [initiatingUser] = await users.usersGet({
      id: restApiUtils.operators.equals(userId),
      limit: "1",
    });

    if (!initiatingUser) {
      throw new Error("Scan creation failed {MissingInitiatingUser}");
    }

    const accessToken = await tokens.getTokenForUser(initiatingUser.providerId);

    const api = bimApiFactory({
      token: accessToken,
    });

    const hubs = await api.get("/project/v1/hubs");

    for (const hub of hubs.data) {
      try {
        logger.info({
          msg: "found hub",
          hubId: hub.id,
        });
        const projects = await api.get(`/project/v1/hubs/${hub.id}/projects`, {
          params: { limit: 100 },
        });

        await BBPromise.map(
          projects.data,
          async (project: any) => {
            try {
              await createProjectScan({ project, initiatingUser });
            } catch (e) {
              logger.error({
                ...e,
                msg: "failed to scan project",
                projectId: project.id,
              });
            }
          },
          { concurrency: 5 }
        );
      } catch (e) {
        logger.error({
          msg: "failed to process hub",
          id: hub.id,
          ...e,
        });
      }
    }

    return { data: null };
  };
};
