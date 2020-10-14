import { ManufacturerList } from "../../shared/types/Manufacturer";
import { MergedServerContext } from "../../shared/types/PluginResolver";
import { resolveProductListFromReferences } from "./Product";

export default {
  Query: {
    allManufacturers: (_obj: any, _args: any, { models }: MergedServerContext) => {
      return models.allManufacturers();
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
  ProductList: {
    currentPage: async (obj, args, ctx) => (await resolveProductListFromReferences(obj, args, ctx)).currentPage,
    lastPage: async (obj, args, ctx) => (await resolveProductListFromReferences(obj, args, ctx)).lastPage,
    perPage: async (obj, args, ctx) => (await resolveProductListFromReferences(obj, args, ctx)).perPage,
    sidebar: async (obj, args, ctx) => (await resolveProductListFromReferences(obj, args, ctx)).sidebar,
    totalItems: async (obj, args, ctx) => (await resolveProductListFromReferences(obj, args, ctx)).totalItems,
    items: async (obj, args, ctx) => (await resolveProductListFromReferences(obj, args, ctx)).items,
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
