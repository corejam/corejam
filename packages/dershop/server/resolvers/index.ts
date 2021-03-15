import { MergedServerContext } from "../types/PluginResolver";
import categoryResolvers from "./Category";
import configResolvers from "./Config";
import manufacturerResolvers from "./Manufacturer";
import orderResolvers from "./Order";
import productResolvers from "./Product";
import * as pluginModels from "./Resolvers";
import seoResolvers from "./SEO";
import userResolvers from "./User";

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
