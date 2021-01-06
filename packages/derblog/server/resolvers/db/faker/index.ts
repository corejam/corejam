import { PluginResolver } from "../../../types/PluginResolver";

import { getAllBlogPosts, createBlogArticle } from "./derblog";

export const models: PluginResolver = {
  getAllBlogPosts,
  createBlogArticle,
};
