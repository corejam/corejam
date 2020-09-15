import { CanvasPage, CanvasPageDB, CanvasPeer, CanvasPeers } from "./Canvas";

export declare type CoreResolver = {
  schema(): Promise<any>;
  allCanvasPages(): Promise<CanvasPageDB[]>;
  canvasPageCreate(canvasPageInput: CanvasPage): Promise<CanvasPageDB>;
  canvasPageEdit(id: string, canvasPageInput: CanvasPage): Promise<CanvasPageDB>;
  canvasPageById(id: string): Promise<CanvasPageDB | null>;
  canvasPageByUrl(slug: string): Promise<CanvasPageDB | null>;
  canvasOpenPeers(id: string, peerInput: CanvasPeer): Promise<CanvasPeers>;
  canvasPollPeers(id: string): Promise<CanvasPeers | null>;
  canvasClosePeers(id: string): Promise<CanvasPage>;
};
