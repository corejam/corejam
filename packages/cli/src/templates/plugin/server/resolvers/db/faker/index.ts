import { PluginResolver } from "../../../types/PluginResolver";
import { getAllPluginName, pluginNameCreate } from "./pluginName";

export const models: PluginResolver = {
  getAllPluginName,
  pluginNameCreate,
};
