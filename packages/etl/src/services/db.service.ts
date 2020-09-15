import Knex from "knex";
import { Environment } from "../Environment";
import { Logger } from "./logger.service";

export type DB = Knex;

type Deps = Pick<
  Environment,
  "db_database" | "db_host" | "db_password" | "db_port" | "db_userName"
> & {
  logger: Logger;
};

export function $DB({ logger, ...env }: Deps): DB {
  const client = Knex({
    client: "pg",
    connection: {
      host: env.db_host,
      port: env.db_port,
      database: env.db_database,
      user: env.db_userName,
      password: env.db_password,
    },
  });

  client.on("query", function ({ sql, bindings }) {
    logger.debug({ msg: "DB query", sql, bindings });
  });

  return client;
}
