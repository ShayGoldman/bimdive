import axios from "axios";
import querystring from "querystring";
import { getFromEnv } from "../utils/getFromEnv";
import { $BIMApiFactory, BIMApiFactory } from "./bim-api-factory.service";
import { Context } from "./context.service";
import { $DB, DB } from "./db.service";
import { $SQS, SQS } from "./sqs.service";

export type Services = {
  db: DB;
  bimApiFactory: BIMApiFactory;
  sqs: SQS;
  getTokenFromScanId: (scanId: string) => Promise<string>;
  generateTemporaryAPIToken: () => Promise<string>;
};

// part of 3-legged-token flow
function $GetTokenFromScanId({ db }: { db: DB }) {
  return async function getTokenFromScanId(scanId: string): Promise<string> {
    const {
      rows: [{ access_token }],
    } = await db.raw(
      `
      SELECT * from events.access_tokens
      JOIN events.users ON events.access_tokens.user_provider_id=events.users.provider_id 
      JOIN events.scans ON events.scans.initiating_user_id=events.users.id AND events.scans.id=?
      `,
      scanId
    );

    return access_token;
  };
}

// 2-legged-token
function $GenerateTemporaryAPIToken({
  clientId,
  clientSecret,
}: {
  clientId: string;
  clientSecret: string;
}) {
  return async function generateTemporaryAPIToken(): Promise<string> {
    const { data } = await axios.post(
      "https://developer.api.autodesk.com/authentication/v1/authenticate",
      querystring.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "client_credentials",
        scope: "data:read account:read",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return data.access_token;
  };
}

export const $ServiceProvider = async ({
  context,
}: {
  context: Context;
}): Promise<Services> => {
  const { logger } = context;
  const db = await $DB({
    db_connection_string:
      getFromEnv({ name: "DB_CONNECTION_URI", logValue: false }) || "",
    logger,
  });

  const clientId = getFromEnv({ name: "FORGE_CLIENT_ID", fatal: true });
  const clientSecret = getFromEnv({ name: "FORGE_CLIENT_SECRET", fatal: true });

  const sqs = $SQS({ logger });

  const bimApiFactory = $BIMApiFactory({ logger });

  return {
    db,
    bimApiFactory,
    sqs,
    getTokenFromScanId: $GetTokenFromScanId({ db }),
    generateTemporaryAPIToken: $GenerateTemporaryAPIToken({
      clientId,
      clientSecret,
    }),
  };
};
