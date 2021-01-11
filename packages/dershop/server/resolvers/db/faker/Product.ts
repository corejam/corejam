import { updateDates } from "@corejam/base";
import type { Image, ImageInput } from "@corejam/base/dist/typings/Image";
import type { SEOInput } from "@corejam/base/dist/typings/Seo";
import type { Deliverability } from "@corejam/base/dist/typings/Utils";
import { random } from "faker";
import { CategoryDB } from "../../../../shared/types/Category";
import type { ManufacturerDB } from "../../../../shared/types/Manufacturer";
import { LinkResult } from "../../../../shared/types/PluginResolver";
import type { PriceInput } from "../../../../shared/types/Price";
import type { ManufacturerRefence, ProductCoreInput, ProductDB } from "../../../../shared/types/Product";
import { categories, categoryById, categoryEdit } from "./Category";
import { generateProduct, generateSeo } from "./Generator";
import { manufacturerByID, manufacturerEdit, manufacturers } from "./Manufacturer";

export let products = [] as ProductDB[];

try {
  const staticFile = require(process.cwd() + "/.corejam/faker.json")
  products.push(...staticFile.products)
  console.log("Load from static data")
} catch (e) {
  //Nothing for now
}

if (products.length === 0) {
  const staticCategoryIndex = Math.floor(Math.random() * categories.length)
  const staticCategory = categories[staticCategoryIndex];

  const staticProduct = generateProduct({
    seo: generateSeo({
      metaTitle: "Static Test Product",
      metaDescription: "Static Test Product",
      url: "static-test-product",
    }),
    name: "Static Test Product",
  });

  const staticProductDb: ProductDB = {
    id: "static-test-product",
    ...staticProduct,
    categories: [staticCategory],
    manufacturer: {
      id: manufacturers[0].id,
    } as ManufacturerRefence,
  };

  products.push(staticProductDb);
  manufacturers[0].products?.push(staticProductDb);
  staticCategory.products?.push(staticProductDb)
}

if (products.length === 1) {
  for (let index = 0; index < 100; index++) {
    const manufacturer: ManufacturerDB = manufacturers[Math.floor(Math.random() * manufacturers.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];

    const generated = generateProduct();
    const generatedDb: ProductDB = {
      id: random.uuid(),
      ...generated,
      categories: [category],
      manufacturer: {
        id: manufacturer.id,
        data: manufacturer
      } as ManufacturerRefence
    };

    products.push(generatedDb as ProductDB);
    productLinkManufacturer(generatedDb.id, manufacturer.id)
    productLinkCategory(generatedDb.id, category.id)
  }
}

export function allProducts(): Promise<ProductDB[]> {
  return new Promise((res) => res(products));
}

export function productByUrl(slug: string): Promise<ProductDB | null> {
  const product = products.filter((product) => {
    if (product.seo?.url == slug) {
      return product;
    }
    return;
  });

  return new Promise((res) => res(product[0]));
}

export function productByID(id: string): Promise<ProductDB | null> {
  const product = products.filter((product) => product.id === id)[0];
  return new Promise((res) => res(product));
}

export function productCreate(productInput: ProductCoreInput): Promise<ProductDB> {
  const product: ProductDB = {
    id: random.uuid(),
    ...productInput,
    ...updateDates(),
  };

  products.push(product);

  return new Promise((res) => res(product));
}

export function productEdit(id: string, productInput: ProductCoreInput): Promise<ProductDB> {
  let product = products.filter((product: ProductDB) => {
    return product.id === id;
  })[0];

  product = { ...product, ...productInput };

  products = products.map((product: ProductDB) => {
    if (product.id === id) {
      product = { ...product, ...productInput };
    }
    return product;
  });

  return new Promise((res) => res(product));
}

export function productEditPrice(id: string, priceInput: PriceInput): Promise<ProductDB> {
  const product = products.filter((product: ProductDB) => {
    return product.id === id;
  })[0];

  product.price = priceInput;

  products = products.map((product: ProductDB) => {
    if (product.id === id) {
      product = { ...product };
    }
    return product;
  });

  return new Promise((res) => res(product));
}

export function productEditSEO(id: string, seoInput: SEOInput): Promise<ProductDB> {
  const product = products.filter((product: ProductDB) => {
    return product.id === id;
  })[0];

  const editedProduct = product;
  editedProduct.seo = seoInput;

  products = products.map((product: ProductDB) => {
    if (product.id === id) {
      product = { ...editedProduct };
    }
    return product;
  });

  return new Promise((res) => res(product));
}

export function productEditDeliverability(id: string, deliveryInput: Deliverability): Promise<ProductDB> {
  const product = products.filter((product: ProductDB) => {
    return product.id === id;
  })[0];

  product.deliverability = deliveryInput;

  products = products.map((product: ProductDB) => {
    if (product.id === id) {
      product = { ...product };
    }
    return product;
  });

  return new Promise((res) => res(product));
}

export function productAddImage(id: string, imageInput: ImageInput): Promise<ProductDB> {
  const product = products.filter((product: ProductDB) => {
    return product.id === id;
  })[0];

  if (!product.images) {
    product.images = ([] as unknown) as [Image];
  }

  product.images.push({
    ...imageInput,
    ...updateDates(),
  } as Image);

  products = products.map((product: ProductDB) => {
    if (product.id === id) {
      product = { ...product };
    }
    return product;
  });

  return new Promise((res) => res(product));
}

export async function productLinkManufacturer(
  id: string,
  manufacturerId: string
): Promise<LinkResult> {
  const manufacturer = await manufacturerByID(manufacturerId) as ManufacturerDB;

  products.map(async (product: ProductDB, key) => {
    if (product.id === id) {
      product = {
        ...product,
        manufacturer: {
          id: manufacturerId,
          data: manufacturer
        }
      };

      //Update the manufacturer item list
      const items = manufacturer.products ? manufacturer.products : []
      items.push(product)

      await manufacturerEdit(manufacturer.id, {
        products: items
      })
    }
    products[key] = product;
  });

  return new Promise((res) => res({ result: true }))
}

/*
export function productUnlinkManufacturer(
  _manufacturerId: string
): Promise<ProductDB> {
  return new Promise(res => res())
}
 */
export async function productLinkCategory(
  id: string,
  categoryId: string
): Promise<LinkResult> {
  const category = await categoryById(categoryId) as CategoryDB;

  products.map(async (product: ProductDB, key) => {
    if (product.id === id) {
      product = {
        ...product,
        categories: product.categories ? product.categories.concat(category) : [category]
      };

      //Update the manufacturer item list
      const items = category.products ? category.products.concat(product) : [product]
      await categoryEdit(category.id, {
        products: items
      })
      products[key] = product;
    }
  });

  return new Promise((res) => res({ result: true }))
}

/*
export function productUnlinkCategory(
  _categoryId: string
): Promise<ProductDB> {
  return new Promise(res => res())
}
*/
