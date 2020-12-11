import { MergedServerContext, PluginResolver } from "../types/PluginResolver";

let dbModels;

if (process.env.DB_DRIVER === "DB_FAUNA") {
  dbModels = require("./db/fauna").models;
} else {
  dbModels = require("./db/faker").models;
}

/**
 * Anything that this plugin offers to the server context is retrieved here
 */
export function getPluginContext({ models }): MergedServerContext {
  //Merge models
  models = {
    ...models,
    ...dbModels,
  };

  return { models };
}

export const models: PluginResolver = {
  ...dbModels,
};
