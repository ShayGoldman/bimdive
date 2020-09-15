import { $Logger } from "./services/logger.service";

export type Environment = {
  token: string;
  logger_prettyPrint: boolean;
  logger_level: string;
  db_host: string;
  db_port: number;
  db_userName: string;
  db_password: string;
  db_database: string;
};

export function $Environment(): Environment {
  const logger_prettyPrint = Boolean(process.env.LOGGER_PRETTY_PRINT);
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
    db_host: getFromEnv("DB_HOST") || "",
    db_port: parseInt(getFromEnv("DB_PORT") || "5432", 10),
    db_password: getFromEnv("DB_PASSWORD") || "",
    db_userName: getFromEnv("DB_USERNAME") || "",
    db_database: getFromEnv("DB_DATABASE") || "",
  };
}
