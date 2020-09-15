import pino, { Logger } from "pino";
import { Environment } from "../Environment";

export { Logger } from "pino";

export function $Logger({
  logger_prettyPrint,
  logger_level,
}: Pick<Environment, "logger_prettyPrint" | "logger_level">): Logger {
  return pino({
    level: logger_level,
    prettyPrint: logger_prettyPrint && { colorize: true, translateTime: true },
  });
}
