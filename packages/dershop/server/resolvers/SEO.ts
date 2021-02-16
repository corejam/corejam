import { MergedServerContext } from "../../shared/types/PluginResolver";

export default {
  Query: {
    getSEOIndex: (_obj: any, _args: any, { models }: MergedServerContext) => {
      return models.getSEOIndex();
    },
  },
};
