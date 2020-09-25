import { Logger } from "./logger.service";
import { DB } from "../integrations/db.service";

export type DBValidation = () => Promise<void>;

type Deps = {
  db: DB;
  logger: Logger;
};

export function $DBValidation({ logger, db }: Deps): DBValidation {
  return async () => {
    try {
      if (Boolean(parseInt(process.env.DB_RESET || "0", 10))) {
        await db.raw(`DROP SCHEMA etl CASCADE`);
      }

      await db.schema
        .createSchemaIfNotExists("etl")
        .createTableIfNotExists("issues", (issues) => {
          issues.increments("id").primary().unsigned();
          issues.text("provider_id");
          issues.text("title");
          issues.text("status");
          issues.text("type");
          issues.text("sub_type");
          issues.text("assigned_to");
          issues.text("assigned_to_type");
          issues.timestamp("due_date");
        })
        .createTableIfNotExists("users", (users) => {
          users.increments("id").primary().unsigned();
          users.text("provider_id");
          users.text("email");
          users.text("first_name");
          users.text("last_name");
          users.text("profile_img_url");
        })
        .createTableIfNotExists("access_tokens", (tokens) => {
          tokens.text("user_provider_id");
          tokens.text("access_token");
          tokens.text("refresh_token");
          tokens.timestamp("issued_at");
          tokens.timestamp("expires_at");
        })
        .createTableIfNotExists("scans", (scans) => {
          scans.increments("id").primary().unsigned();
          scans.text("initiating_user_id");
        })
        .withSchema("etl");
      logger.info("DB validation passed");
    } catch (error) {
      logger.fatal({
        msg: "Error validating database",
        errorText: error.toString(),
        error,
      });
      throw error;
    }
  };
}
