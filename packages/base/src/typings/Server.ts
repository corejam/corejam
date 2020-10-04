import { CoreResolver } from "./CoreResolver";
import { EventEmitter } from "events";
import { ServerResponse, IncomingMessage } from "http";

export declare type ServerContext = {
  models: CoreResolver;
  req: IncomingMessage;
  res: ServerResponse;
  eventEmitter: EventEmitter;
};

export declare type IntrospectionResult = {
  __schema: any;
};
