import * as resolvers from "./resolvers/Auth";

const pluginProperties = {
  resolvers,
  schemas: ["auth"],
};

export { getPluginContext } from "./resolvers";
export default pluginProperties;
