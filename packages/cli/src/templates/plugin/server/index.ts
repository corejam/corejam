import { CustomError } from "./Errors";
import * as resolvers from "./resolvers/pluginName";

export const pluginProperties = {
  errors: {
    CustomError,
  },
  resolvers,
  routes: [],
  schemas: ["pluginName"],
};

export { getPluginContext } from "./resolvers";
export default pluginProperties;
