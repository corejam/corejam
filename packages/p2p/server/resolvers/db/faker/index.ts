import { PluginResolver } from "../../../types/PluginResolver";
import { getAllP2p, p2pCreate } from "./p2p";

export const models: PluginResolver = {
  getAllP2p,
  p2pCreate,
};
