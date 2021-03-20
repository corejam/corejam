import { testClient } from "@corejam/base/src/TestClient";
import { generateConfig, generateSeo } from "../../server/resolvers/db/faker/Generator";
import { PluginResolver } from "../../server/types/PluginResolver";

describe("Config", () => {
  //This is the document ID we use to run various tests against instead of reading in every test
  let testID, client, models: PluginResolver;
  const testValues = generateConfig();

  //Bootstrap
  beforeAll(async () => {
    client = await testClient();
    models = client.models;

    const insertedResponse = await models.configCreate(testValues);
    expect(insertedResponse).toMatchObject(testValues);
    testID = insertedResponse.id;
  });

  it("getConfig", async () => {
    //Test that we can retrieve the same values back
    const returnedConfig = await models.config();

    expect(returnedConfig).toEqual(expect.objectContaining(testValues));
  });

  it("updateConfig", async () => {
    const { general } = generateConfig();

    try {
      const editResult = await models.configEdit(testID, { general: general });
      testValues.general = general;

      expect(editResult).toEqual(expect.objectContaining(testValues));
    } catch (e) {
      console.log(e);
    }
  });

  it("updateConfigSEO", async () => {
    const seo = generateSeo();
    const editResult = await models.configEditSEO(testID, seo);
    testValues.seo = seo;

    expect(editResult).toEqual(expect.objectContaining(testValues));
  });
});
