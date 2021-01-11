import { ServerContext } from "@corejam/base/dist/typings/Server";
import { CoreResolver } from "@corejam/base/dist/typings/CoreResolver";
import { MergedServerContext as ExtendedServerContext } from "@corejam/plugin-auth/shared/types/PluginResolver"
import { CanvasPage, CanvasPageDB, CanvasPeer, CanvasPeers } from "./Canvas";

export type LinkResult = {
  result: Boolean
}

/**
 * We are adding these resolvers to the existing CoreResolver
 */
export declare type PluginResolver = {
  allCanvasPages(): Promise<CanvasPageDB[]>;
  canvasPageCreate(canvasPageInput: CanvasPage): Promise<CanvasPageDB>;
  canvasPageEdit(id: string, canvasPageInput: CanvasPage): Promise<CanvasPageDB>;
  canvasPageById(id: string): Promise<CanvasPageDB | null>;
  canvasPageByUrl(slug: string): Promise<CanvasPageDB | null>;
  canvasOpenPeers(id: string, peerInput: CanvasPeer): Promise<CanvasPeers>;
  canvasPollPeers(id: string): Promise<CanvasPeers | null>;
  canvasClosePeers(id: string): Promise<CanvasPage>;
};

export declare type MergedServerResolver = CoreResolver & PluginResolver;

/**
 * We are adding an optional user to the core context if we have it.
 * Merge with exisiting ServerContext
 */
export declare type PluginServerContext = {} & Partial<ExtendedServerContext>;

/**
 * Override models to include our Plugin resolver
 */
export declare type MergedServerContext = Partial<ServerContext> &
  PluginServerContext & {
    models: MergedServerResolver;
  };
