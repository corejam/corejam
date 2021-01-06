import { CustomError } from "./Errors";
import * as resolvers from "./resolvers/derblog";

export const pluginProperties = {
  errors: {
    CustomError,
  },
  resolvers,
  routes: [],
  schemas: ["derblog"],
};

export { getPluginContext } from "./resolvers";
export default pluginProperties;
