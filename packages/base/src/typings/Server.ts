import { EventEmitter } from "events";
import { IncomingMessage, ServerResponse } from "http";
import { CoreResolver } from "./CoreResolver";

export declare type ServerContext = {
  models: CoreResolver;
  req: IncomingMessage;
  res: ServerResponse;
  eventEmitter: EventEmitter;
};
