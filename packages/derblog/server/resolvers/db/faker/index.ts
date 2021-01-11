import { PluginResolver } from "../../../types/PluginResolver";

import { getAllBlogPosts, createBlogArticle, blogArticleByUrl } from "./derblog";

export const models: PluginResolver = {
  getAllBlogPosts,
  createBlogArticle,
  blogArticleByUrl
};
