import { ManufacturerList } from "../../shared/types/Manufacturer";
import { MergedServerContext } from "../../shared/types/PluginResolver";
import { resolveProductListFromReferences } from "./Product";

export default {
  Query: {
    allManufacturers: async (_obj: any, _args: any, { models }: MergedServerContext) => {
      return await models.allManufacturers();
    },
    paginateManufacturers: async (_obj: any, { size, page }, { models }: MergedServerContext) => {
      const offset = (page - 1) * size;

      const allManufacturers = await models.allManufacturers();
      const items = allManufacturers.slice(offset, offset + size);

      const paginated: ManufacturerList = {
        currentPage: page,
        totalItems: allManufacturers.length,
        lastPage: Math.ceil(allManufacturers.length / size),
        perPage: size,
        items: items,
      };

      return new Promise((res) => res(paginated));
    },
    manufacturerById: (_obj: any, args: any, { models }: MergedServerContext) => {
      return models.manufacturerByID(args.id);
    },
    manufacturersForSelect: (_obj: any, _args: any, { models }: MergedServerContext) => {
      return models.manufacturersForSelect();
    },
  },
  ProductList: async (obj: any, args: any, ctx: any) => {
    const resolvedProductList = await resolveProductListFromReferences(obj, args, ctx);
    return {
      currentPage: resolvedProductList.currentPage,
      lastPage: resolvedProductList.lastPage,
      perPage: resolvedProductList.perPage,
      sidebar: resolvedProductList.sidebar,
      totalItems: resolvedProductList.totalItems,
      items: resolvedProductList.items,
    };
  },
  Mutation: {
    manufacturerEditSEO: (_obj: any, args: any, { models }: MergedServerContext) => {
      return models.manufacturerEditSEO(args.id, args.seoInput);
    },
    manufacturerEdit: (_obj: any, args: any, { models }: MergedServerContext) => {
      return models.manufacturerEdit(args.id, args.manufacturerInput);
    },
  },
};
