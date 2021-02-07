import { MergedServerContext } from "../../shared/types/PluginResolver";
import categoryResolvers from "./Category";
import configResolvers from "./Config";
import { models as fakerModels } from "./db/faker";
import { models as faunaModels } from "./db/fauna";
import manufacturerResolvers from "./Manufacturer";
import orderResolvers from "./Order";
import productResolvers from "./Product";
import seoResolvers from "./SEO";
import userResolvers from "./User";

let pluginModels;

if (process.env.DB_DRIVER === "DB_FAUNA") {
  pluginModels = faunaModels;
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

  return { models } as MergedServerContext;
}

export const resolvers = {
  categoryResolvers,
  configResolvers,
  manufacturerResolvers,
  orderResolvers,
  productResolvers,
  userResolvers,
  seoResolvers,
};
