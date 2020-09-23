import { $DB } from "../integrations/db.service";
import { $Logger } from "./logger.service";
import { $DBValidation } from "./db-validation.service";
import { $ETLExtract } from "./etl/etl-extract.service";
import { $BIMApi } from "./bim-api.service";
import { $Environment } from "../Environment";
import { pick } from "lodash";

export type ETL = {
  start: () => Promise<void>;
};

export function $ETL(): ETL {
  const environment = $Environment();
  const logger = $Logger(environment);

  const db = $DB({ logger, ...environment });

  const bimApi = $BIMApi({ logger, token: environment.token });
  const dbValidator = $DBValidation({ db, logger });
  const extract = $ETLExtract({ logger, bimApi });

  return {
    start: async () => {
      await dbValidator();

      try {
        logger.info("ETL Starting");
        const issues = await extract();
        logger.info("ETL extract complete");

        for (const { issue, type, subType } of issues) {
          logger.debug(issue);
          await db("etl.issues").insert({
            provider_id: issue.id,
            type: type?.title || "",
            sub_type: subType?.title || "",
            ...pick(
              issue.attributes,
              "status",
              "title",
              "due_date",
              "assigned_to",
              "assigned_to_type"
            ),
          });
          logger.debug({ msg: "Loaded issue", providerId: issue.id });
        }
        logger.info(`Loaded ${issues.length} issues`);
        logger.info("ETL load complete");
      } catch (error) {
        logger.fatal(error);
      }
    },
  };
}
