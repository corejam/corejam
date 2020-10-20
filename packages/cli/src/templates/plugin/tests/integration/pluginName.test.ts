import { testClient } from "@corejam/base/src/TestClient";

describe("Sample jest test for new Corejam application", () => {
  //This is the document ID we use to run various tests against instead of reading in every test
  let client, models;

  //Bootstrap
  beforeAll(async () => {
    client = await testClient();
    models = client.models;
  });

  it("Sample test", async () => {
    //Get the query from our test client object.
    const { query } = client;

    const testResponse = await query({
      mutation: pluginNameQueryGQL,
    });

    expect(testResponse.data.allPluginName).toEqual([])
  });
});
