import { EventEmitter } from "events";
import { Logger } from "../services/logger.service";

type Event = {
  type: string;
  [key: string]: any;
};

type Deps = {
  logger: Logger;
  handleEvent: Function; // WIP EventsHandler
};

export type EventsEmitter = {
  emit: (event: Event) => Promise<void>;
};

export const $EventsEmitter = ({
  logger,
  handleEvent,
}: Deps): EventsEmitter => {
  const emitter = new EventEmitter();
  emitter.on("event", async function (event) {
    try {
      await handleEvent(event);
    } catch (e) {
      logger.error(e);
    }
  });
  return {
    emit: async (event: Event) => {
      emitter.emit("event", event);
    },
  };
};
