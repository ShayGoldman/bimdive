import Knex from "knex";
import { $DBValidation } from "./db-validation.service";
import { Logger } from "./logger.service";

// import required so webpack will bundle it as well
import "pg";

export type DB = Knex;

type Deps = {
  db_connection_string: string;
  logger: Logger;
};

export async function $DB({ logger, db_connection_string }: Deps): Promise<DB> {
  const client = Knex({
    client: "pg",
    connection: db_connection_string,
  });

  const validationService = $DBValidation({ logger, db: client });
  await validationService();

  client.on("query", function ({ sql, bindings }) {
    logger.debug({ msg: "DB query", sql, bindings });
  });

  return client;
}
