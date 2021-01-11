import { MergedServerContext } from "../types/PluginResolver";
import { SEODocument } from "../../shared/types/SEO"

/**
 * Our resolvers for this plugin
 */
export default {
  Query: {
    allArticles: (_obj: any, _args: any, { models }: MergedServerContext) => {
      return models.getAllBlogPosts();
    },
    paginateArticles: async (_obj: any, { page, size }: any, { models }: MergedServerContext) => {

      const articles = await models.getAllBlogPosts();
      const offset = (page - 1) * size;

      return {
        currentPage: page,
        totalItems: articles.length,
        lastPage: Math.ceil(articles.length / size),
        perPage: size,
        items: articles.slice(offset, offset + size)
      };
    },
    objectFromURL: async (_obj: any, { url }: any, { models }: MergedServerContext): Promise<SEODocument> => {
      const result = {
        article: await models.blogArticleByUrl(url),
      };

      return new Promise((res) => res(result));
    }
  },
  Mutation: {
    createBlogArticle: (_obj: any, args: any, { models }: MergedServerContext) => {
      return models.createBlogArticle(args);
    },
  },
};
