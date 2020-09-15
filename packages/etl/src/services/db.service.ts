import Knex from "knex";
import { Environment } from "../Environment";
import { Logger } from "./logger.service";

export type DB = Knex;

type Deps = Pick<Environment, "db_connection_string"> & {
  logger: Logger;
};

export function $DB({ logger, ...env }: Deps): DB {
  const client = Knex({
    client: "pg",
    connection: env.db_connection_string,
  });

  client.on("query", function ({ sql, bindings }) {
    logger.debug({ msg: "DB query", sql, bindings });
  });

  return client;
}
