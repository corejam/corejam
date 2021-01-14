import { MergedServerContext } from "../types/PluginResolver";

/**
 * Our resolvers for this plugin
 */
export default {
  Query: {
    allP2p: (_obj: any, _args: any, { models }: MergedServerContext) => {
      return models.getAllP2p();
    },
  },
  Mutation: {
    p2pCreate: (_obj: any, args: any, { models }: MergedServerContext) => {
      return models.p2pCreate(args);
    },
  },
};
