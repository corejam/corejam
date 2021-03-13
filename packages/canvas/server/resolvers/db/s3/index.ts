import { PluginResolver } from "../../../types/PluginResolver";
import { allCanvasPages, canvasPageById, canvasPageByUrl, canvasPageCreate, canvasPageEdit } from "./CanvasPage";

export const models: PluginResolver = {
  allCanvasPages,
  canvasPageById,
  canvasPageByUrl,
  canvasPageCreate,
  canvasPageEdit,
};
