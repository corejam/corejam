import { CustomError } from "./Errors";
import * as resolvers from "./resolvers/p2p";

export const pluginProperties = {
  errors: {
    CustomError,
  },
  resolvers,
  routes: [],
  schemas: ["p2p"],
};

export { getPluginContext } from "./resolvers";
export default pluginProperties;
