import { $Logger } from "./services/logger.service";
import { $Environment } from "./Environment";
import { $ETL } from "./services/etl.service";

const environment = $Environment();
const logger = $Logger(environment);

const etl = $ETL();

etl
  .start()
  .catch(logger.error)
  .finally(() => process.exit());
