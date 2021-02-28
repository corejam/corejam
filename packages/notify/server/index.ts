import { getPluginContext } from "./resolvers";

/**
 * We only add to the context so there
 * is nothing relevant here
 */
export const pluginProperties = {
  errors: {},
  resolvers: {},
  context: getPluginContext,
  routes: [],
  schemas: [],
};

export default pluginProperties;
