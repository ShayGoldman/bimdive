import { $Logger } from "../services/logger.service";

const logger = $Logger({
  logger_level: "info",
  logger_prettyPrint: false,
});

type Params = {
  name: string;
  logValue?: boolean;
};

export function getFromEnv(params: Params & { fatal: true }): string;
export function getFromEnv(params: Params): string | undefined;
export function getFromEnv({
  name,
  logValue = true,
  fatal,
}: Params & { fatal: boolean }): string | undefined {
  const value = process.env[name];

  if (!value && fatal) {
    logger.fatal({ msg: "empty environment variable", name });
    throw new Error(`Empty environment variable: [${name}]`);
  } else if (value && fatal) {
    logger.info({
      msg: "detected environment variable",
      name,
      value: logValue ? value : undefined,
    });
    return value;
  } else {
    logger.info({
      msg: "detected environment variable",
      name,
      value: logValue ? value : undefined,
    });

    return value;
  }
}
