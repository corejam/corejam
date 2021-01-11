import { CategoryList } from "../../shared/types/Category";
import { MergedServerContext } from "../../shared/types/PluginResolver";

export default {
  Query: {
    allCategories: (_obj: any, _args: any, { models }: MergedServerContext) => {
      return models.allCategories();
    },
    paginateCategories: async (_obj: any, { size, page }, { models }: MergedServerContext) => {
      const offset = (page - 1) * size;

      const allCategories = await models.allCategories();
      const items = allCategories.slice(offset, offset + size);

      const paginated: CategoryList = {
        currentPage: page,
        totalItems: allCategories.length,
        lastPage: Math.ceil(allCategories.length / size),
        perPage: size,
        items: items,
      };

      return new Promise((res) => res(paginated));
    },
    categoryById: (_obj: any, { id }, { models }: MergedServerContext) => {
      return models.categoryById(id);
    },
  },
  Mutation: {},
};
