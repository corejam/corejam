import Fuse from "fuse.js";
import { ProductDB, ProductList } from "../../shared/types/Product";
import { Sidebar } from "../../shared/types/Sidebar";
import { MergedServerContext } from "../types/PluginResolver";

export function generateSidebar(products: ProductDB[] = []): Sidebar {
  const sidebar: Sidebar = { categories: [], brands: [] };

  //iterate over each product
  products.forEach((product: ProductDB) => {
    //Check for brands
    const manufacturer = product.manufacturer?.data;

    if (manufacturer) {
      //If it exists update it
      const brand = sidebar.brands?.filter((item) => {
        if (item.name === manufacturer.name) {
          return item;
        }
        return;
      })[0];

      if (brand) {
        brand.itemCount++;
      } else {
        //Create new item
        sidebar.brands.push({
          itemCount: 1,
          name: manufacturer.name,
          url: manufacturer.seo?.url ? manufacturer.seo?.url : "",
        });
      }
    }

    //Check for categories
    product.categories?.forEach((productCategory) => {
      const category = sidebar.categories?.filter((item) => {
        if (item.name === productCategory.name) {
          return item;
        }
        return;
      })[0];

      //If it exists update it
      if (category) {
        category.itemCount++;
      } else {
        //Create new item
        sidebar.categories.push({
          itemCount: 1,
          name: productCategory.name,
          url: productCategory.seo?.url ? productCategory.seo?.url : "",
        });
      }
    });
  });

  return sidebar;
}

/**
 * Resolve products from references
 *
 * @param parent
 * @param param1
 * @param ctx
 */
export async function resolveProductListFromReferences(parent, { size, page = 1 }, ctx): Promise<ProductList> {
  //We already have everything
  if (parent.sidebar) {
    ctx.currentProductList = parent;
    return new Promise((res) => res(ctx.currentProductList));
  }

  if (ctx.currentProductList) return ctx.currentProductList;
  const resolvedProducts: ProductDB[] = [];

  for await (const productRef of parent) {
    resolvedProducts.push(await ctx.models.productByID(productRef.id));
  }

  if (!size) {
    size = resolvedProducts.length;
  }

  const offset = (page - 1) * size;
  const sidebar = generateSidebar(resolvedProducts);
  const items = resolvedProducts.slice(offset, offset + size);

  const currentProductList: ProductList = {
    currentPage: page,
    totalItems: resolvedProducts.length,
    lastPage: Math.ceil(resolvedProducts.length / size),
    perPage: size,
    items: items,
    sidebar: sidebar,
  };

  ctx.currentProductList = currentProductList;

  return new Promise((res) => res(ctx.currentProductList));
}

export default {
  Query: {
    allProducts: (_obj: any, _args: any, { models }: MergedServerContext) => {
      return models.allProducts();
    },
    paginateProducts: async (_obj: any, params, ctx: MergedServerContext) => {
      const allProducts = await ctx.models.allProducts();

      return resolveProductListFromReferences(allProducts, params, ctx);
    },
    productSearch: async (_obj: any, { search, size, page }, { models }: MergedServerContext) => {
      return new Promise(async (res) => {
        const offset = (page - 1) * size;

        const allProducts = await models.allProducts();
        const sidebar = generateSidebar(allProducts);

        const searchOptions = {
          includeScore: true,
          threshold: 0.3,
          minMatchCharLength: 2,
          keys: ["name"],
        };

        const fuse = new Fuse(allProducts, searchOptions);
        const searchResponse = fuse.search(search);

        let results: ProductDB[] = [];

        results = searchResponse.map((searchResult: Fuse.FuseResult<any>) => searchResult.item);

        const items = results.slice(offset, offset + size);

        const paginated: ProductList = {
          currentPage: page,
          totalItems: results.length,
          lastPage: Math.ceil(results.length / size),
          perPage: size,
          items: items,
          sidebar,
        };

        res(paginated);
      });
    },
    productByUrl: (_obj: any, args: any, { models }: MergedServerContext) => {
      return models.productByUrl(args.url);
    },
    productById: (_obj: any, args: any, { models }: MergedServerContext) => {
      return models.productByID(args.id);
    },
  },
  ManufacturerReference: {
    data: (parent, _args, { models }: MergedServerContext) => {
      return models.manufacturerByID(parent.id);
    },
  },
  CategoryReference: {
    data: (parent, _args, { models }: MergedServerContext) => {
      return models.categoryById(parent.id);
    },
  },
  Mutation: {
    productCreate: (_obj: any, args: any, { models }: MergedServerContext) => {
      return models.productCreate(args.productInput);
    },
    productEdit: (_obj: any, args: any, { models }: MergedServerContext) => {
      return models.productEdit(args.id, args.productInput);
    },
    productEditPrice: (_obj: any, args: any, { models }: MergedServerContext) => {
      return models.productEditPrice(args.id, args.priceInput);
    },
    productEditSEO: (_obj: any, args: any, { models }: MergedServerContext) => {
      return models.productEditSEO(args.id, args.seoInput);
    },
    productEditDeliverability: (_obj: any, args: any, { models }: MergedServerContext) => {
      return models.productEditDeliverability(args.id, args.deliveryInput);
    },
    productAddImage: (_obj: any, args: any, { models }: MergedServerContext) => {
      return models.productAddImage(args.id, args.imageInput);
    },
    productLinkManufacturer: (_obj: any, { id, manufacturerid }: any, { models }: MergedServerContext) => {
      return models.productLinkManufacturer(id, manufacturerid);
    },
    productLinkCategory: (_obj: any, { id, categoryid }: any, { models }: MergedServerContext) => {
      return models.productLinkCategory(id, categoryid);
    },
  },
};
