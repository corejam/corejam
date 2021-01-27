import { ServerContext } from "@corejam/base/dist/typings/Server";
import { CoreResolver } from "@corejam/base/dist/typings/CoreResolver";
import type { P2p, P2pCreateInput } from "./p2p";
/**
 * We are adding these resolvers to the existing CoreResolver
 */
export declare type PluginResolver = {
  getAllP2p(): Promise<P2p[]>;
  p2pCreate(userCreateInput: P2pCreateInput): Promise<P2p>;
};

export declare type MergedServerResolver = CoreResolver & PluginResolver;

/**
 * We are adding an optional user to the core context if we have it.
 * Merge with exisiting ServerContext
 */
export declare type PluginServerContext = {};

/**
 * Override models to include our Plugin resolver
 */
export declare type MergedServerContext = Partial<ServerContext> &
  PluginServerContext & {
    models: MergedServerResolver;
  };
