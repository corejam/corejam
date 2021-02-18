import * as resolvers from "./resolvers/Auth";
import { CorejamApplication } from "@corejam/base/dist/typings/Application"

const pluginProperties: CorejamApplication = {
  resolvers,
  schemas: ["auth"],
};

export { getPluginContext } from "./resolvers";
export default pluginProperties;
