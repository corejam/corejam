import { CoreResolver } from "../../../typings/CoreResolver";
import { generateConfig, generateImage } from "./Generator";
import { schema } from "./Schema";

export const generator = {
  generateConfig,
  generateImage,
};

export const models: CoreResolver = {
  schema,
};
