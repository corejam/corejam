import * as resolvers from "./resolvers";
import { getPluginContext } from "./resolvers";

const pluginProperties = {
  resolvers,
  context: getPluginContext,
  emits: ["orderCompleted"],
  schemas: ["canvas"],
};

export default pluginProperties;
