import { PluginResolver } from "../../../../shared/types/PluginResolver";

import {
  allCanvasPages,
  canvasClosePeers,
  canvasOpenPeers,
  canvasPageById,
  canvasPageByUrl,
  canvasPageCreate,
  canvasPageEdit,
  canvasPollPeers
} from "./CanvasPage"

export const models: PluginResolver = {
  allCanvasPages,
  canvasClosePeers,
  canvasOpenPeers,
  canvasPageById,
  canvasPageByUrl,
  canvasPageCreate,
  canvasPageEdit,
  canvasPollPeers
};
