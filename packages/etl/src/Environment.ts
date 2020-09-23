import { $Logger } from "./services/logger.service";

export type Environment = {
  token: string;
  logger_prettyPrint: boolean;
  logger_level: string;
  db_connection_string: string;
};

export function $Environment(): Environment {
  const logger_prettyPrint = Boolean(
    parseInt(process.env.LOGGER_PRETTY_PRINT || "0", 10)
  );
  const logger_level = process.env.LOGGER_LEVEL || "info";

  const logger = $Logger({
    logger_prettyPrint,
    logger_level,
  });

  function getFromEnv(variable: string, showValue: boolean = true) {
    const value = process.env[variable];
    logger.info({
      msg: "Detected environment variable",
      variable,
      value: showValue ? value : undefined,
    });
    return value;
  }

  return {
    logger_prettyPrint,
    logger_level,
    token: getFromEnv("BIM_API_ACCESS_TOKEN", false) || "",
    db_connection_string: getFromEnv("DB_CONNECTION_STRING") || "",
  };
}
