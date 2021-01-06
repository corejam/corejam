import { ServerContext } from "@corejam/base/dist/typings/Server";
import { CoreResolver } from "@corejam/base/dist/typings/CoreResolver";
import type { BlogArticleDB, BlogArticleInput } from "../../shared/types/Blog";

/**
 * We are adding these resolvers to the existing CoreResolver
 */
export declare type PluginResolver = {
  getAllBlogPosts(): Promise<BlogArticleDB[]>;
  createBlogArticle(articleCreateInput: BlogArticleInput): Promise<BlogArticleDB>;
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
