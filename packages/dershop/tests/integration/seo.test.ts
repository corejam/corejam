import { testClient } from "@corejam/base/src/TestClient";
import * as faker from "faker";
import { generateSeo } from "../../server/resolvers/db/faker/Generator";
import { getObjectFromURL, getSeoIndex } from "../../shared/graphql/Queries/URL";
import { PluginResolver as ShopResolver } from "../../server/types/PluginResolver";
import { ProductCoreInput, ProductDB, ProductEditInput } from "../../shared/types/Product";
import { SEO } from "../../shared/types/Seo";

describe("SEO", () => {
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

    const insertedResponse = await models.productCreate(testValues);
    await models.productEditSEO(insertedResponse.id, generateSeo());

    testID = insertedResponse.id;
  });

  it("Fetch the complete SEO Index", async () => {
    const { query } = client;

    //Test that we can retrieve the same values back
    const returnedSEOIndex = await query({
      query: getSeoIndex,
    });

    const allProducts = await models.allProducts();
    const testProduct = await models.productByID(testID);

    expect(returnedSEOIndex.data.getSEOIndex.length == allProducts.length);
    expect(returnedSEOIndex.data.getSEOIndex).toContain(testProduct.seo?.url);
  });

  it("Can query Product with URL", async () => {
    const seo: SEO = {
      url: faker.lorem.slug(3),
      metaTitle: faker.commerce.product(),
      metaDescription: faker.lorem.sentence(),
      keywords: faker.lorem.words(3).split(" "),
    };

    await models.productEditSEO(testID, seo);

    const { query } = client;

    //Test that we can retrieve the same values back
    const returnedSEOResult = await query({
      query: getObjectFromURL,
      variables: { url: seo.url },
    });

    const values: ProductEditInput = testValues;
    values.seo = seo;

    expect(returnedSEOResult.data.objectFromURL.product).toMatchObject(values);
  });
});
