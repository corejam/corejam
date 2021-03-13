import * as resolvers from "./resolvers/Canvas";
import { getPluginContext } from "./resolvers";

const pluginProperties = {
  resolvers,
  context: getPluginContext,
  emits: ["orderCompleted"],
  schemas: ["canvas"],
};

export default pluginProperties;
