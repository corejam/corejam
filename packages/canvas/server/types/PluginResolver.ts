import { CoreResolver } from "@corejam/base/dist/typings/CoreResolver";
import { ServerContext } from "@corejam/base/dist/typings/Server";
import { MergedServerContext as ExtendedServerContext } from "@corejam/plugin-auth/shared/types/PluginResolver";
import { CanvasPage } from "../../shared/types/Canvas";
import { Canvas } from "../models/Canvas";

export type LinkResult = {
  result: Boolean;
};

/**
 * We are adding these resolvers to the existing CoreResolver
 */
export declare type PluginResolver = {
  allCanvasPages(): Promise<Canvas[]>;
  canvasPageCreate(canvasPageInput: CanvasPage): Promise<Canvas>;
  canvasPageEdit(id: string, canvasPageInput: CanvasPage): Promise<Canvas>;
  canvasPageById(id: string): Promise<Canvas | null>;
  canvasPageByUrl(slug: string): Promise<Canvas | null>;
  /*
     canvasOpenPeers(id: string, peerInput: CanvasPeer): Promise<CanvasPeers>;
     canvasPollPeers(id: string): Promise<CanvasPeers | null>;
     canvasClosePeers(id: string): Promise<CanvasPage>;
     */
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
