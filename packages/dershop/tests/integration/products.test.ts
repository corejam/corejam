import { updateDates } from "@corejam/base/src/Functions";
import { generateImage, generateSeo } from "@corejam/base/src/resolvers/db/faker/Generator";
import { testClient } from "@corejam/base/src/TestClient";
import { Deliverability } from "@corejam/base/src/typings/Utils";
import * as faker from "faker";
import { advanceTo } from "jest-date-mock";
import { generateCategory, generateManufacturer } from "../../server/resolvers/db/faker/Generator";
import { productLinkCategory, productLinkManufacturer } from "../../shared/graphql/Mutations/Admin/Product";
import { categoryById } from "../../shared/graphql/Queries/Category";
import { manufacturerById } from "../../shared/graphql/Queries/Manufacturer";
import { paginateProductsGQL } from "../../shared/graphql/Queries/Product";
import { CategoryDB } from "../../shared/types/Category";
import { PluginResolver as ShopResolver } from "../../server/types/PluginResolver";
import { PriceInput } from "../../shared/types/Price";
import { ProductCoreInput, ProductDB, ProductList } from "../../shared/types/Product";
import { SEO } from "../../shared/types/Seo";

describe("Products", () => {
  advanceTo(new Date(2020, 5, 27, 0, 0, 0)); // reset to date time.

  //This is the document ID we use to run various tests against instead of reading in every test
  let testID, client, models: ShopResolver;

  const testValues: ProductCoreInput = {
    active: true,
    promoted: false,
    name: faker.commerce.product(),
    description: faker.random.words(),
    ean: faker.random.uuid(),
    manufacturer_number: faker.random.uuid(),
    sku: faker.random.uuid(),
  };

  //Bootstrap
  beforeAll(async () => {
    client = await testClient();
    models = client.models;

    const insertedResponse = (await models.productCreate(testValues));
    expect(insertedResponse).toMatchObject(testValues);
    testID = insertedResponse.id;
  });

  it("getProductById", async () => {
    //Test that we can retrieve the same values back
    const returnedProductById = await models.productByID(testID);
    expect(returnedProductById).toEqual(expect.objectContaining(testValues));
  });

  it("allProducts", async () => {
    const returnedPagination = await models.allProducts();

    expect(returnedPagination.length).toBeGreaterThan(0);

    returnedPagination.map((item) => {
      if (item.id === testID) {
        expect(item).toEqual(expect.objectContaining(testValues));
      }
    });
  });

  it("getProductByUrl", async () => {
    const seo: SEO = {
      url: faker.lorem.slug(3),
      metaTitle: faker.commerce.product(),
      metaDescription: faker.lorem.sentence(),
      keywords: faker.lorem.words(3).split(" "),
    };

    await models.productEditSEO(testID, seo);

    const returnedProduct = await models.productByUrl(seo.url);

    expect(returnedProduct).toEqual(expect.objectContaining({ ...testValues, seo: seo }));
  });

  it("updateProduct", async () => {
    const newValues = {
      active: false,
      promoted: true,
      name: faker.commerce.product(),
      description: faker.random.words(),
      ean: faker.random.uuid(),
      manufacturer_number: faker.random.uuid(),
      sku: faker.random.uuid(),
    };

    const editResult = await models.productEdit(testID, newValues);

    expect(editResult).toEqual(expect.objectContaining(newValues));
  });

  it("updateProductPrice", async () => {
    const price: PriceInput = {
      tax_rate: 17,
      gross: 42.39,
      net: 37.39,
      purchase_price_gross: 32.39,
    };

    const editResult = await models.productEditPrice(testID, price);
    expect(editResult).toEqual(expect.objectContaining({ price: price }));
  });

  it("updateProductSEO", async () => {
    const seo: SEO = {
      url: faker.lorem.slug(3),
      metaTitle: faker.commerce.product(),
      metaDescription: faker.lorem.sentence(),
      keywords: faker.lorem.words(3).split(" "),
    };

    const editResult = await models.productEditSEO(testID, seo);
    expect(editResult).toEqual(expect.objectContaining({ seo: seo }));
  });

  it("updateProductDeliverability", async () => {
    const deliverability: Deliverability = {
      stock: faker.random.number({ max: 100, min: 0 }),
      clearance_sale: false,
      delivery_time: faker.random.number({ min: 1, max: 5 }).toString(),
      restock_time_days: faker.random.number({ min: 1, max: 3 }),
      free_shipping: false,
      min_order_qty: 1,
      max_order_qty: 10,
    };

    const editResult = await models.productEditDeliverability(testID, deliverability);

    expect(editResult).toEqual(expect.objectContaining({ deliverability: deliverability }));
  });

  it("addImageToProduct", async () => {
    const image = generateImage({
      ...updateDates(),
    });

    const editResult = await models.productAddImage(testID, image);

    expect(editResult).toEqual(expect.objectContaining({ images: [image] }));
  });

  it("Paginated products", async () => {
    const { query } = client;

    //Test that we can retrieve the same values back
    const pagination = await query({
      query: paginateProductsGQL,
      variables: { page: 1, size: 24 },
    });

    const paginated: ProductList = pagination.data.paginateProducts;
    expect(paginated).toHaveProperty("sidebar");
    expect(paginated.currentPage).toEqual(1);
    expect(paginated.items.length).toBeGreaterThan(0);
  });

  it("Link product to manufacturer", async () => {
    const { mutate, query } = client;

    const generatedManu = generateManufacturer();

    //@ts-ignore
    generatedManu.products = [];

    const manufacturer = await models.manufacturerCreate(generatedManu);
    delete manufacturer.products;

    //Test that we can retrieve the same values back
    const linkResult = await mutate({
      query: productLinkManufacturer,
      variables: { id: testID, manufacturerid: manufacturer.id },
    });

    expect(linkResult.data.productLinkManufacturer).toEqual({ result: true });

    //Check links working both ways
    const product = await models.productByID(testID);
    expect(product.manufacturer?.data).toMatchObject(manufacturer);

    //Test that we can retrieve the same values back
    const manufacturerResult = await query({
      query: manufacturerById,
      variables: { id: manufacturer.id },
    });

    const manufacturerRes = manufacturerResult.data.manufacturerById;

    //Check our item is in the list
    let returnedItem;
    manufacturerRes.products?.items?.map((item) => {
      if (item.id === product.id) {
        returnedItem = item;
      }
    });

    expect(product).toMatchObject(returnedItem);
  });

  it("Link product to category", async () => {
    const { mutate, query } = client;

    await models.productEditSEO(testID, generateSeo());
    const generatedCat = generateCategory();

    //@ts-ignore
    generatedCat.products = [];

    const category = await models.categoryCreate(generatedCat);
    delete category.products;

    //Test that we can retrieve the same values back
    const linkResult = await mutate({
      query: productLinkCategory,
      variables: { id: testID, categoryid: category.id },
    });

    expect(linkResult.data.productLinkCategory).toEqual({ result: true });

    //Check links working both ways
    const product = (await models.productByID(testID));
    const productCat = product.categories?.pop() as CategoryDB;
    expect(productCat).toMatchObject(category);

    //Test that we can retrieve the same values back
    const categoryResult = await query({
      query: categoryById,
      variables: { id: category.id },
    });

    const categoryRes = categoryResult.data.categoryById;

    //Check our item is in the list
    let returnedItem;
    categoryRes.products?.items?.map((item) => {
      if (item.id === product.id) {
        returnedItem = item;
      }
    });

    expect(product).toMatchObject(returnedItem);
  });
});
