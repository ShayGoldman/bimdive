import {
  Configuration,
  ResponseContext,
  RequestContext,
} from "@bimdive/rest-api-client";
import { getFromEnv } from "../utils/getFromEnv";
import * as uuid from "uuid";
import { Context } from "./context.service";
import pick from "lodash/pick";

type ValueOperator = (value: string) => string;
type Operator = () => string;

export type RESTApiUtils = {
  configuration: Configuration;
  generateUUID: () => string;
  now: () => string;
  // http://postgrest.org/en/v7.0.0/api.html#operators
  operators: {
    equals: ValueOperator;
    lessThen: ValueOperator;
    lessEqualThen: ValueOperator;
    greaterThen: ValueOperator;
    greaterEqualThen: ValueOperator;
    null: Operator;
  };
};

export function $RESTApiUtils({ context }: { context: Context }): RESTApiUtils {
  const { logger } = context;

  const prependOperator = (operator: string) => (value: string) =>
    [operator, value].join(".");

  return {
    configuration: new Configuration({
      basePath: getFromEnv({ name: "REST_API_URI", fatal: true }),
      fetchApi: require("node-fetch"),
      headers: {
        Prefer: "resolution=merge-duplicates",
      },
      middleware: [
        {
          pre: async (ctx: RequestContext) => {
            logger.debug({
              msg: "rest api request",
              ...ctx,
            });
          },
          post: async (ctx: ResponseContext) => {
            logger.debug({
              msg: "rest api response",
              ...ctx,
              response: pick(ctx.response, "status", "statusText", "url"),
            });
          },
        },
      ],
    }),
    generateUUID: () => uuid.v4(),
    now: () => new Date().toUTCString(),
    operators: {
      equals: prependOperator("eq"),
      lessThen: prependOperator("lt"),
      lessEqualThen: prependOperator("lte"),
      greaterThen: prependOperator("gt"),
      greaterEqualThen: prependOperator("gte"),
      null: () => `is.null`,
    },
  };
}
