import {
  $ProxyADAPIClient,
  ProxyADAPIClient,
} from "../api/proxy-ad-api.service";
import { getFromEnv } from "../utils/getFromEnv";
import {
  $BIMAccessTokensService,
  BIMAccessTokensService,
} from "./bim-access-tokens.service";
import { $BIMApiFactory, BIMApiFactory } from "./bim-api-factory.service";
import { Context } from "./context.service";
import { $RESTApiUtils, RESTApiUtils } from "./rest-api-utils";
import { $SQS, SQS } from "./sqs.service";

export type Services = {
  restApiUtils: RESTApiUtils;
  bimApiFactory: BIMApiFactory;
  cachedBimApi: ProxyADAPIClient;
  sqs: SQS;
  tokens: BIMAccessTokensService;
};

export const $ServiceProvider = ({
  context,
}: {
  context: Context;
}): Services => {
  const { logger } = context;

  const clientId = getFromEnv({
    name: "FORGE_CLIENT_ID",
    fatal: true,
    logValue: false,
  });
  const clientSecret = getFromEnv({
    name: "FORGE_CLIENT_SECRET",
    fatal: true,
    logValue: false,
  });

  const sqs = $SQS({ logger });

  const restApiUtils = $RESTApiUtils({ context });

  const tokens = $BIMAccessTokensService({
    forgeClientId: clientId,
    forgeClientSecret: clientSecret,
    logger,
    restApiUtils,
  });

  const bimApiFactory = $BIMApiFactory({ logger, tokens });
  const cachedBimApi = $ProxyADAPIClient({
    context,
    proxyPath: getFromEnv({
      name: "AD_API_PROXY_URI",
      fatal: true,
    }),
  });

  return {
    bimApiFactory,
    cachedBimApi,
    sqs,
    restApiUtils,
    tokens,
  };
};
