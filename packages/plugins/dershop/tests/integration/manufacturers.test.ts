import { advanceTo } from "jest-date-mock";
import {
  generateManufacturer,
  generateSeo,
} from "../../server/resolvers/db/faker/Generator";
import { ManufacturerCreateInput, ManufacturerDB } from "../../shared/types/Manufacturer";
import { PluginResolver } from "../../shared/types/PluginResolver";
import { testClient } from "@corejam/base/src/TestClient";


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
    const returnedPagination: ManufacturerDB[] = await models.allManufacturers();

    expect(returnedPagination.length).toBeGreaterThan(0);

    returnedPagination.map((item) => {
      if (item.id === testID) {
        expect(item).toEqual(expect.objectContaining(testValues));
      }
    });
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
