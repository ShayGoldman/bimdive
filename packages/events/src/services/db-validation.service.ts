import { getFromEnv } from "../utils/getFromEnv";
import { DB } from "./db.service";
import { Logger } from "./logger.service";

export type DBValidation = () => Promise<void>;

type Deps = {
  db: DB;
  logger: Logger;
};

export function $DBValidation({ logger, db }: Deps): DBValidation {
  return async () => {
    try {
      if (Boolean(parseInt(getFromEnv("DB_RESET", false) || "0", 10))) {
        await db.raw(`DROP SCHEMA IF EXISTS events CASCADE`);
      }

      await db.schema.createSchemaIfNotExists("events");

      const eventsSchema = () => db.schema.withSchema("events");

      if (!(await eventsSchema().hasTable("issues"))) {
        await eventsSchema().createTable("issues", (issues) => {
          issues.uuid("id").primary().notNullable().unique();
          issues.string("provider_id", 64).notNullable().unique();
          issues.string("title", 255).notNullable();
          issues.string("status", 127);
          issues.string("type", 255);
          issues.string("sub_type", 255);
          issues.string("assigned_to", 64);
          issues.text("assigned_to_type");
          issues.timestamp("due_date", { precision: 3, useTz: false });
          issues
            .timestamp("scanned_at", { precision: 3, useTz: false })
            .notNullable()
            .defaultTo(db.fn.now());
        });
      }

      if (!(await eventsSchema().hasTable("users"))) {
        await eventsSchema().createTable("users", (users) => {
          users.uuid("id").primary().notNullable().unique();
          users.string("provider_id", 64).notNullable().unique();
          users.text("email");
          users.text("first_name");
          users.text("last_name");
          users.text("profile_img_url");
          users.timestamp("scanned_at");
          users
            .timestamp("modified_at", { precision: 3, useTz: false })
            .notNullable()
            .defaultTo(db.fn.now());
          users
            .timestamp("created_at", { precision: 3, useTz: false })
            .notNullable()
            .defaultTo(db.fn.now());
        });
      }

      if (!(await eventsSchema().hasTable("access_tokens"))) {
        await eventsSchema().createTable("access_tokens", (tokens) => {
          tokens.string("provider_id", 64).notNullable().unique();
          tokens.text("access_token");
          tokens.text("refresh_token");
          tokens
            .timestamp("issued_at", { precision: 3, useTz: false })
            .notNullable()
            .defaultTo(db.fn.now());
          tokens
            .timestamp("expires_at", { precision: 3, useTz: false })
            .notNullable();
        });
      }

      if (!(await eventsSchema().hasTable("scans"))) {
        await eventsSchema().createTable("scans", (scans) => {
          scans.increments("id").primary().unique().unsigned();
          scans.string("provider_id", 64).notNullable().unique();
          scans
            .timestamp("created_at", { precision: 3, useTz: false })
            .notNullable()
            .defaultTo(db.fn.now());
        });
      }

      // actually creates the schema
      // await events;

      logger.info("database validation passed");
    } catch (error) {
      logger.fatal({
        msg: "error validating database",
        errorText: error.toString(),
        error,
      });
      throw error;
    }
  };
}
