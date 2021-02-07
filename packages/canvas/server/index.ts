import { CorejamApplication } from "@corejam/base/dist/typings/Application";
import { resolvers } from "./resolvers";

const pluginProperties: CorejamApplication = {
  resolvers,
  emits: ["orderCompleted"],
  schemas: ["canvas"],
};

export { getPluginContext } from "./resolvers";
export default pluginProperties;
