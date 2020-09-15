import Fuse from "fuse.js";
import { MergedServerContext } from "../../shared/types/PluginResolver";
import { ProductDB, ProductList } from "../../shared/types/Product";
import { allProductsGQL } from "../../shared/graphql/Queries/Product";
import { Sidebar } from "../../shared/types/Sidebar";
import { getServerClient } from "@corejam/base"

export function generateSidebar(products: ProductDB[] = []): Sidebar {
  const sidebar: Sidebar = { categories: [], brands: [] }

  //iterate over each product
  products.forEach((product: ProductDB) => {
    //Check for brands
    const manufacturer = product.manufacturer?.data
    let brand;

    if (manufacturer) {
      //If it exists update it
      if (brand = sidebar.brands?.filter((item) => {
        if (item.name === manufacturer.name) {
          return item;
        }
        return
      })[0]) {
        brand.itemCount++;
      } else {
        //Create new item
        sidebar.brands.push({
          itemCount: 1,
          name: manufacturer.name,
          url: manufacturer.seo?.url ? manufacturer.seo?.url : ""
        })
      }
    }

    let category;
    //Check for categories
    product.categories?.forEach((productCategory) => {
      //If it exists update it
      if (category = sidebar.categories?.filter((item) => {
        if (item.name === productCategory.name) {
          return item;
        }
        return
      })[0]) {
        category.itemCount++;
      } else {
        //Create new item
        sidebar.categories.push({
          itemCount: 1,
          name: productCategory.name,
          url: productCategory.seo?.url ? productCategory.seo?.url : ""
        })
      }
    })
  })

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
  if (ctx.currentProductList) return ctx.currentProductList;
  const resolvedProducts: ProductDB[] = []

  for await (const productRef of parent) {
    resolvedProducts.push(await ctx.models.productByID(productRef.id))
  }

  if (!size) {
    size = resolvedProducts.length
  }

  const offset = (page - 1) * size;
  const sidebar = generateSidebar(resolvedProducts)
  const items = resolvedProducts.slice(offset, offset + size);

  const currentProductList: ProductList = {
    currentPage: page,
    totalItems: resolvedProducts.length,
    lastPage: Math.ceil(resolvedProducts.length / size),
    perPage: size,
    items: items,
    sidebar: sidebar
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
      const client = getServerClient();
      const { allProducts } = await client.request(allProductsGQL);

      return resolveProductListFromReferences(allProducts, params, ctx)
    },
    productSearch: async (_obj: any, { search, size, page }, _ctx: MergedServerContext) => {
      const client = getServerClient();
      const offset = (page - 1) * size;

      const allProducts = await client.request(allProductsGQL);
      const sidebar = generateSidebar(allProducts)
      const searchOptions = {
        includeScore: true,
        threshold: 0.3,
        minMatchCharLength: 2,
        keys: ["name"],
      };

      const fuse = new Fuse(allProducts, searchOptions);
      const searchResponse = fuse.search(search);

      let results: ProductDB[] = [];

      results = searchResponse.map((searchResult: Fuse.FuseResult<any>) => {
        return searchResult.item;
      });

      const items = results.slice(offset, offset + size);

      const paginated: ProductList = {
        currentPage: page,
        totalItems: results.length,
        lastPage: Math.ceil(results.length / size),
        perPage: size,
        items: items,
        sidebar
      };

      return new Promise((res) => res(paginated));
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
    productLinkManufacturer: (_obj: any, { id, manufacturerId }: any, { models }: MergedServerContext) => {
      return models.productLinkManufacturer(id, manufacturerId);
    },
    productLinkCategory: (_obj: any, { id, categoryId }: any, { models }: MergedServerContext) => {
      return models.productLinkCategory(id, categoryId);
    },
  },
};