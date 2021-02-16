import { testClient } from "@corejam/base/src/TestClient";
import { advanceTo } from "jest-date-mock";
import { generateManufacturer, generateSeo } from "../../server/resolvers/db/faker/Generator";
import { allManufacturersGQL, paginateManufacturersGQL } from "../../shared/graphql/Queries/Manufacturer";
import { ManufacturerCreateInput, ManufacturerDB, ManufacturerList } from "../../shared/types/Manufacturer";
import { PluginResolver } from "../../shared/types/PluginResolver";

describe("Manufacturers", () => {
  advanceTo(new Date(2020, 5, 27, 0, 0, 0)); // reset to date time.

  //This is the document ID we use to run various tests against instead of reading in every test
  let testID, client, models: PluginResolver;

  const testValues = generateManufacturer({
    seo: generateSeo({ url: "manufacturer-slug/1/" }),
  }) as ManufacturerCreateInput;

  //Bootstrap
  beforeAll(async () => {
    client = await testClient();
    models = client.models;

    const insertedResponse = await models.manufacturerCreate(testValues);
    expect(insertedResponse).toEqual(expect.objectContaining(testValues));
    testID = insertedResponse.id;
  });

  it("getManufacturerById", async () => {
    //Test that we can retrieve the same values back
    const returnedManufacturerById = (await models.manufacturerByID(testID)) as ManufacturerDB;

    expect(returnedManufacturerById).toEqual(expect.objectContaining(testValues));
  });

  it("allManufacturers", async () => {
    const { query } = client;

    //Test that we can retrieve the same values back
    const allManufacturers = (
      await query({
        query: allManufacturersGQL,
        variables: { page: 1, size: 24 },
      })
    ).data.allManufacturers;

    expect(allManufacturers.length).toBeGreaterThan(0);

    allManufacturers.map((item) => {
      if (item.id === testID) {
        expect(item.name).toEqual(testValues.name);
        expect(item.website).toEqual(testValues.website);
        expect(item.seo.url).toEqual(testValues.seo?.url);
      }
    });
  });

  it("Paginated Manufacturers", async () => {
    const { query } = client;

    //Test that we can retrieve the same values back
    const pagination = await query({
      query: paginateManufacturersGQL,
      variables: { page: 1, size: 24 },
    });

    const paginated: ManufacturerList = pagination.data.paginateManufacturers;
    expect(paginated.currentPage).toEqual(1);
    expect(paginated.items.length).toEqual((await models.allManufacturers()).length);
  });

  it("getManufacturerByUrl", async () => {
    const returnedManufacturer = await models.manufacturerByUrl("manufacturer-slug/1/");
    expect(returnedManufacturer).toEqual(expect.objectContaining(testValues));
  });

  it("updateManufacturer", async () => {
    const newValues = generateManufacturer({
      seo: generateSeo({ url: "manufacturer-slug/1/" }),
    });
    delete newValues.seo;
    const editResult = await models.manufacturerEdit(testID, newValues);
    expect(editResult).toEqual(expect.objectContaining(newValues));
  });

  it("manufacturersForSelect", async () => {
    const list = await models.manufacturersForSelect();
    expect(list.length).toBeGreaterThan(0);
  });

  it("updateManufacturerSEO", async () => {
    const seo = generateSeo();
    const editResult = await models.manufacturerEditSEO(testID, seo);
    expect(editResult).toEqual(expect.objectContaining({ seo: seo }));
  });
});
