import { resolvers } from "./resolvers";

const pluginProperties = {
  resolvers,
  routes: [],
  listens: [],
  emits: ["orderCompleted"],
  schemas: ["canvas"],
};

export { getPluginContext } from "./resolvers";
export default pluginProperties;
