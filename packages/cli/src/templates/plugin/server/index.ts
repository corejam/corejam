import { CustomError } from "./Errors";
import { pluginNameCreate } from "./graphql/Mutations";
import { allPluginNameGQL } from "./graphql/Queries";
import { getPluginContext } from "./resolvers";
import * as resolvers from "./resolvers/pluginName";

export const pluginProperties = {
  queries: { allPluginNameGQL },
  mutations: { pluginNameCreate },
  errors: {
    CustomError,
  },
  resolvers,
  routes: [],
  schemas: ["pluginName"],
};

export default getPluginContext;
