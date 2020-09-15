import { CoreResolver } from "../../../typings/CoreResolver";
import { generateConfig, generateImage } from "./Generator";
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
import { schema } from "./Schema";

export const generator = {
  generateConfig,
  generateImage,
};

export const models: CoreResolver = {
  allCanvasPages,
  canvasPageById,
  canvasPageCreate,
  canvasPageEdit,
  canvasPageByUrl,
  canvasOpenPeers,
  canvasPollPeers,
  canvasClosePeers,
  schema,
};
