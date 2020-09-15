import { resolvers } from "./resolvers";
import loggedIn from "./Listener/loggedIn";

const pluginProperties = {
  resolvers,
  routes: [],
  listens: [{ event: "loggedIn", callback: loggedIn }],
  emits: ["orderCompleted"],
  schemas: ["dershop"],
};

export { getPluginContext } from "./resolvers";
export default pluginProperties;
