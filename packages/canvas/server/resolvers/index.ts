import { MergedServerContext } from "../../shared/types/PluginResolver";
import canvasResolvers from "./Canvas";
import { models as fakerModels } from "./db/faker";
import { models as faunaModels } from "./db/fauna";
import { models as s3Models } from "./db/s3";

let pluginModels;

if (process.env.DB_DRIVER === "DB_FAUNA") {
  pluginModels = faunaModels;
} else if (process.env.DB_DRIVER === "DB_S3") {
  pluginModels = s3Models;
} else {
  pluginModels = fakerModels;
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

export const resolvers = {
  canvasResolvers,
};
