import pino from "pino";
import xor from "lodash/xor";

// import required so webpack will bundle it as well
import "pino-pretty";

type LogFn = (obj: object) => void;
export interface Logger {
  trace: LogFn;
  debug: LogFn;
  info: LogFn;
  warn: LogFn;
  error: LogFn;
  fatal: LogFn;

  context: LogFn;
  contextDel: (key: string | string[]) => void;
  contextPurge: (whitelist: string[]) => void;
}

type Opts = {
  logger_prettyPrint: boolean;
  logger_level: string;
};

export function $Logger({ logger_prettyPrint, logger_level }: Opts): Logger {
  const pinoLogger = pino({
    level: logger_level,
    prettyPrint: logger_prettyPrint && { colorize: true, translateTime: true },
  });

  let sharedContext = {};

  function context(ctx: object): void {
    sharedContext = Object.assign({}, sharedContext, ctx);
  }

  function contextDel(key: string | string[], whitelist: string[] = []): void {
    const strings = Array.isArray(key) ? key : [key];

    for (const key of xor(strings, whitelist)) {
      delete sharedContext[key];
    }
  }

  function contextPurge(whitelist: string[] = []): void {
    const keys = Object.keys(sharedContext);

    for (const key of xor(keys, whitelist)) {
      delete sharedContext[key];
    }
  }

  function logFunction(fnName: string) {
    return function logFn(obj: object) {
      pinoLogger[fnName]({ ...sharedContext, ...obj });
    };
  }

  return {
    context,
    contextDel,
    contextPurge,

    trace: logFunction("trace"),
    debug: logFunction("debug"),
    info: logFunction("info"),
    warn: logFunction("warn"),
    error: logFunction("error"),
    fatal: logFunction("fatal"),
  };
}
