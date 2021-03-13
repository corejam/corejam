import { MergedServerContext } from "../types/PluginResolver";
import * as defaultModels from "./db/canvas";
import { models as s3Models } from "./db/s3";

let pluginModels;

if (process.env.DB_DRIVER === "DB_S3") {
  pluginModels = s3Models;
} else {
  pluginModels = defaultModels.default;
}

/**
 * Anything that this plugin offers to the server context is retrieved here
 */
export function getPluginContext({ models }): MergedServerContext {
  //Merge models
  models = {
    ...models,
    ...pluginModels,
  };

  return { models };
}

