import { getFromEnv } from "../utils/getFromEnv";
import { $Logger, Logger } from "./logger.service";

export type Context = {
  logger: Logger;
  environment: string;
  // todo utils - utils thay require logging should be exposed from context, like extracting message attributes
};

export const $Context = (): Context => {
  const logger = $Logger({
    logger_level: getFromEnv({ name: "LOGGER_LEVEL" }) || "info",
    logger_prettyPrint:
      getFromEnv({ name: "LOGGER_PRETTY_PRINT" }) === "true" || false,
  });

  return {
    logger,
    environment: getFromEnv({ name: "NODE_ENV", fatal: true }),
  };
};
