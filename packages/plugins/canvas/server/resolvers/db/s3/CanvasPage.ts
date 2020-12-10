import type { CanvasPage, CanvasPageDB, CanvasPeer, CanvasPeers } from "../../../../shared/types/Canvas";

export function canvasPageByUrl(_slug: string): Promise<CanvasPageDB | null> {
    throw new Error("To implement");
}

export function allCanvasPages(): Promise<CanvasPageDB[]> {
    throw new Error("To implement");
}

export function canvasPageCreate(_canvasPageInput: CanvasPage): Promise<CanvasPageDB> {
    throw new Error("To implement");
}

export function canvasPageEdit(_id: string, _canvasPageInput: CanvasPage): Promise<CanvasPageDB> {
    throw new Error("To implement");
}

export function canvasPageById(_id: string): Promise<CanvasPageDB | null> {
    throw new Error("To implement");
}

export function canvasOpenPeers(_id: string, _peerInput: CanvasPeer): Promise<CanvasPeers> {
    throw new Error("To implement");
}

export function canvasClosePeers(_id: string): Promise<CanvasPage> {
    throw new Error("To implement");
}

export function canvasPollPeers(_id: string): Promise<CanvasPeers | null> {
    throw new Error("To implement");
}
