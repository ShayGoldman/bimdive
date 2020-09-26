import pino, { Logger } from "pino";

// import required so webpack will bundle it as well
import "pino-pretty";

export { Logger } from "pino";

type Opts = {
  logger_prettyPrint: boolean;
  logger_level: string;
};

export function $Logger({ logger_prettyPrint, logger_level }: Opts): Logger {
  return pino({
    level: logger_level,
    prettyPrint: logger_prettyPrint && { colorize: true, translateTime: true },
  });
}
