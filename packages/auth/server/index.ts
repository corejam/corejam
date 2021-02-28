import { getPluginContext } from "./resolvers";
import * as resolvers from "./resolvers/Auth";

const pluginProperties = {
  resolvers,
  context: getPluginContext,
  schemas: ["auth"],
};

export default pluginProperties;
