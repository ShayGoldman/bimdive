import { $Context } from "../services/context.service";
import { $ServiceProvider } from "../services/service-provider";
import { $APIGatewayRuntimeFactory } from "./runtime/APIGatewayRuntime";
import { $SQSRuntimeFactory } from "./runtime/SQSRuntime";

export function $APIEnvironment() {
  const runtimeFactory = $APIGatewayRuntimeFactory();
  const context = $Context();
  const services = $ServiceProvider({ context });

  return {
    context,
    services,
    runtimeFactory,
  };
}

export function $SQSEnvironment() {
  const runtimeFactory = $SQSRuntimeFactory();
  const context = $Context();
  const services = $ServiceProvider({ context });

  return {
    context,
    services,
    runtimeFactory,
  };
}
