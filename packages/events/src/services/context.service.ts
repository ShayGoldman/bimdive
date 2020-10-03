import { getFromEnv } from "../utils/getFromEnv";
import { $BIMApiFactory, BIMApiFactory } from "./bim-api-factory.service";
import { $DB, DB } from "./db.service";
import { $Logger, Logger } from "./logger.service";
import { $SQS, SQS } from "./sqs.service";

export type Context = {
  logger: Logger;
  db: DB;
  bimApiFactory: BIMApiFactory;
  sqs: SQS;
  getTokenFromScanId: (scanId: string) => Promise<string>;
  environment: string;
};

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

export const $Context = async (): Promise<Context> => {
  const logger = $Logger({
    logger_level: getFromEnv({ name: "LOGGER_LEVEL" }) || "info",
    logger_prettyPrint:
      getFromEnv({ name: "LOGGER_PRETTY_PRINT" }) === "true" || false,
  });
  const db = await $DB({
    db_connection_string:
      getFromEnv({ name: "DB_CONNECTION_URI", logValue: false }) || "",
    logger,
  });
  const sqs = $SQS({ logger });

  const bimApiFactory = $BIMApiFactory({ logger });

  return {
    logger,
    db,
    bimApiFactory,
    sqs,
    getTokenFromScanId: $GetTokenFromScanId({ db }),
    environment: getFromEnv({ name: "NODE_ENV", fatal: true }),
  };
};
