import { MergedServerContext } from "../types/PluginResolver";

/**
 * Our resolvers for this plugin
 */
export default {
  Query: {
    allPluginName: (_obj: any, _args: any, { models }: MergedServerContext) => {
      return models.getAllPluginName();
    },
  },
  Mutation: {
    pluginNameCreate: (_obj: any, args: any, { models }: MergedServerContext) => {
      return models.pluginNameCreate(args);
    },
  },
};
