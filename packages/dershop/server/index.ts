import loggedIn from "./Listener/loggedIn";
import { resolvers } from "./resolvers";

const pluginProperties = {
  resolvers,
  routes: [],
  listens: [{ event: "loggedIn", callback: loggedIn }],
  emits: ["orderCompleted"],
  schemas: ["dershop"],
};

export { getPluginContext } from "./resolvers";
export default pluginProperties;
