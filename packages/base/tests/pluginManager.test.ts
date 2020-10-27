import { getDataClient } from "../src/PluginManager";

describe("Plugin Manager", () => {
  it("Data Clients are returned as singletons", async () => {
    const singleton = {
      testobject: 1
    };

    const dataClient = getDataClient("testClient", () => (singleton))
    expect(dataClient).toEqual(singleton)

    //When we fetch it a second time we still expect the first one because we did not purge
    const dataClient2 = getDataClient("testClient", () => ({testobject: 2}))
    expect(dataClient2).toEqual(singleton)

    const dataClient3 = getDataClient("testClient", () => ({testobject: 3}), true)
    expect(dataClient3).toEqual({testobject: 3})
  });
})