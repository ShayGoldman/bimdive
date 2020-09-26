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
};

function $GetTokenFromScanId({ db }: { db: DB }) {
  return async function getTokenFromScanId(scanId: string): Promise<string> {
    const [scan] = await db("etl.scans").select().where({ id: scanId });
    const [{ access_token }] = await db("etl.access_tokens")
      .select()
      .where({ user_provider_id: scan.initiating_user_id })
      .orderBy("issued_at", "desc")
      .limit(1);

    return access_token;
  };
}

export const $Context = async (): Promise<Context> => {
  const logger = $Logger({
    logger_level: process.env.LOGGER_LEVEL || "info",
    logger_prettyPrint: process.env.LOGGER_PRETTY_PRINT === "true" || false,
  });
  const db = await $DB({
    db_connection_string: process.env.DB_CONNECTION_URI || "",
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
  };
};
