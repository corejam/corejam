import { CoreResolver } from "../../../typings/CoreResolver";
import {
  allCanvasPages,
  canvasClosePeers,
  canvasOpenPeers,
  canvasPageById,
  canvasPageByUrl,
  canvasPageCreate,
  canvasPageEdit,
  canvasPollPeers,
} from "./CanvasPage";
import { schema } from "./Config";

export const models: CoreResolver = {
  allCanvasPages,
  canvasPageById,
  canvasPageByUrl,
  canvasPageCreate,
  canvasPageEdit,
  canvasOpenPeers,
  canvasPollPeers,
  canvasClosePeers,
  schema,
};
