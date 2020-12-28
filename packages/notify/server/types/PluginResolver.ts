import { ServerContext } from "@corejam/base/dist/typings/Server";
import { CoreResolver } from "@corejam/base/dist/typings/CoreResolver";
import Notify from "../Notify"

/**
 * We are adding these resolvers to the existing CoreResolver
 */
export declare type PluginResolver = {
};

export declare type MergedServerResolver = CoreResolver & PluginResolver;

/**
 * We are adding an optional user to the core context if we have it.
 * Merge with exisiting ServerContext
 */
export declare type PluginServerContext = {
  notify: Notify
};

/**
 * Override models to include our Plugin resolver
 */
export declare type MergedServerContext = Partial<ServerContext> &
  PluginServerContext;
