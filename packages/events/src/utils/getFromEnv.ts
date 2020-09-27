import { $Logger } from "../services/logger.service";

const logger = $Logger({
  logger_level: "info",
  logger_prettyPrint: false,
});

export function getFromEnv(variable: string, showValue: boolean = true) {
  const value = process.env[variable];
  logger.info({
    msg: "detected environment variable",
    variable,
    value: showValue ? value : undefined,
  });
  return value;
}
