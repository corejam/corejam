import loggedIn from "./Listener/loggedIn";
import { getPluginContext, resolvers } from "./resolvers";

const pluginProperties = {
  resolvers,
  context: getPluginContext,
  routes: [],
  listens: [{ event: "loggedIn", callback: loggedIn }],
  emits: ["orderCompleted"],
  schemas: ["dershop"],
};

console.log(pluginProperties.resolvers);

export default pluginProperties;
