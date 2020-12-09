import { resolvers } from "./resolvers";

const pluginProperties = {
  resolvers,
  routes: [],
  listens: [],
  emits: ["orderCompleted"],
  schemas: ["dershop"],
};

export { getPluginContext } from "./resolvers";
export default pluginProperties;
