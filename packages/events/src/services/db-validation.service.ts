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
      if (
        Boolean(
          parseInt(getFromEnv({ name: "DB_RESET", logValue: false }) || "0", 10)
        )
      ) {
        await db.raw(`DROP SCHEMA IF EXISTS events CASCADE`);
      }

      await db.raw(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
      await db.schema.createSchemaIfNotExists("events");

      const eventsSchema = () => db.schema.withSchema("events");
      const uuid = () => db.raw("uuid_generate_v4()");

      if (!(await eventsSchema().hasTable("issues"))) {
        await eventsSchema().createTable("issues", (issues) => {
          issues.uuid("id").primary();
          issues.string("provider_id", 64).notNullable().unique();
          issues.string("project_provider_id", 64).notNullable();
          issues.string("title", 255).notNullable();
          issues.string("status", 127).notNullable();
          issues.string("type", 255);
          issues.string("sub_type", 255);
          issues.string("owned_by", 64);
          issues.string("assigned_to", 64);
          issues.text("assigned_to_type");
          issues.timestamp("due_date", { precision: 3, useTz: true });
          issues
            .timestamp("scanned_at", { precision: 3, useTz: true })
            .notNullable()
            .defaultTo(db.fn.now());
        });
      }

      if (!(await eventsSchema().hasTable("custom_attributes"))) {
        await eventsSchema().createTable("custom_attributes", (attributes) => {
          attributes.uuid("id").primary();
          attributes.string("provider_id", 64).notNullable().index();
          attributes.string("type", 16).notNullable();
          attributes.string("title", 128).notNullable();
          attributes.string("description", 512);
          attributes.string("value", 128); // for list attributes
          attributes.string("value_id", 128); // for list attributes
          attributes.timestamp("created_at", { precision: 3, useTz: true });
          attributes.timestamp("updated_at", { precision: 3, useTz: true });
          attributes.timestamp("deleted_at", { precision: 3, useTz: true });
          attributes
            .timestamp("scanned_at", { precision: 3, useTz: true })
            .notNullable()
            .defaultTo(db.fn.now());
        });

        await db.raw(`
        CREATE UNIQUE INDEX custom_attributes_provider_id_value_id ON events.custom_attributes (provider_id, value_id) WHERE value_id IS NOT NULL;
        
        CREATE UNIQUE INDEX custom_attributes_provider_id ON events.custom_attributes (provider_id) WHERE value_id IS NULL;
        `);
      }

      if (!(await eventsSchema().hasTable("issue_custom_attributes"))) {
        await eventsSchema().createTable(
          "issue_custom_attributes",
          (attributes) => {
            attributes.uuid("id").primary();
            attributes.string("issue_provider_id", 64).notNullable();
            attributes.string("custom_attribute_provider_id", 64).notNullable();
            attributes.string("type", 64).notNullable();
            attributes.string("value", 512);
            attributes
              .timestamp("scanned_at", { precision: 3, useTz: true })
              .notNullable()
              .defaultTo(db.fn.now());
            attributes.unique([
              "issue_provider_id",
              "custom_attribute_provider_id",
            ]);
          }
        );
      }

      if (!(await eventsSchema().hasTable("issue_comments"))) {
        await eventsSchema().createTable("issue_comments", (comments) => {
          comments.uuid("id").primary();
          comments.string("issue_provider_id", 64).notNullable();
          comments.string("comment_provider_id", 64).notNullable();
          comments.string("created_by", 64);
          comments.text("body").defaultTo("");
          comments
            .timestamp("created_at", { precision: 3, useTz: true })
            .notNullable();
          comments
            .timestamp("updated_at", { precision: 3, useTz: true })
            .notNullable();

          comments
            .timestamp("scanned_at", { precision: 3, useTz: true })
            .notNullable()
            .defaultTo(db.fn.now());
        });
      }

      if (!(await eventsSchema().hasTable("users"))) {
        await eventsSchema().createTable("users", (users) => {
          users.uuid("id").primary().defaultTo(uuid());
          users.string("provider_id", 64).notNullable().unique();
          users.string("email", 255).unique().notNullable();
          users.text("first_name");
          users.text("last_name");
          users.text("profile_img_url");
          users.timestamp("scanned_at");
          users
            .timestamp("modified_at", { precision: 3, useTz: true })
            .notNullable()
            .defaultTo(db.fn.now());
          users
            .timestamp("created_at", { precision: 3, useTz: true })
            .notNullable()
            .defaultTo(db.fn.now());

          users.specificType(
            "name",
            "text GENERATED ALWAYS AS (COALESCE(first_name, '') || ' ', COALESCE(last_name, '')) STORED"
          );
        });
      }

      if (!(await eventsSchema().hasTable("access_tokens"))) {
        await eventsSchema().createTable("access_tokens", (tokens) => {
          tokens.string("user_provider_id", 64).primary();
          tokens.text("access_token").notNullable();
          tokens.text("refresh_token").notNullable();
          tokens
            .timestamp("issued_at", { precision: 3, useTz: true })
            .notNullable()
            .defaultTo(db.fn.now());
          tokens
            .timestamp("expires_at", { precision: 3, useTz: true })
            .notNullable();
        });
      }

      if (!(await eventsSchema().hasTable("scans"))) {
        await eventsSchema().createTable("scans", (scans) => {
          scans.uuid("id").primary().defaultTo(uuid());
          scans.uuid("initiating_user_id").notNullable();
          scans.string("project_provider_id", 64).notNullable();
          scans.string("project_name", 255).notNullable();
          scans
            .timestamp("created_at", { precision: 3, useTz: true })
            .notNullable()
            .defaultTo(db.fn.now());
        });
      }

      // Views
      // events.v_issue_custom_attributes
      await db.raw(`
      CREATE OR REPLACE VIEW events.v_issue_custom_attributes AS
      SELECT
        issue.id,
        issue.provider_id,
      array_agg((((
        CASE WHEN ((issue_attributes.type)::text = 'list'::text) THEN
          list_attributes.title
        ELSE
          single_attributes.title
        END)::text || ': '::text) || (
      CASE WHEN ((issue_attributes.type)::text = 'list'::text) THEN
        list_attributes.value
      ELSE
        issue_attributes.value
      END)::text)) AS attributes
    FROM (((events.issues issue
          JOIN events.issue_custom_attributes issue_attributes ON ((((issue_attributes.issue_provider_id)::text = (issue.provider_id)::text)
                AND(issue_attributes.value IS NOT NULL))))
        LEFT JOIN events.custom_attributes single_attributes ON ((((single_attributes.provider_id)::text = (issue_attributes.custom_attribute_provider_id)::text)
              AND(NOT((single_attributes.type)::text = 'list'::text)))))
      LEFT JOIN events.custom_attributes list_attributes ON ((((list_attributes.provider_id)::text = (issue_attributes.custom_attribute_provider_id)::text)
            AND((issue_attributes.type)::text = 'list'::text)
            AND((issue_attributes.value)::text = (list_attributes.value_id)::text))))
    GROUP BY
      issue.id,
      issue.provider_id
      `);

      logger.info({ msg: "database validation passed" });
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
