import { MergedServerContext } from "../types/PluginResolver";

/**
 * Our resolvers for this plugin
 */
export default {
  Query: {
    allArticles: (_obj: any, _args: any, { models }: MergedServerContext) => {
      return models.getAllBlogPosts();
    },
  },
  Mutation: {
    createBlogArticle: (_obj: any, args: any, { models }: MergedServerContext) => {
      return models.createBlogArticle(args);
    },
  },
};
