import { collectPlugins } from "../src/Bootstrap";

describe("Bootstrap", () => {
  it("collectsPluginsCorrectly", async () => {
    //Mock some plugins here
    expect(collectPlugins()).toEqual([])
  });

  /**
   * We are expecting certain types based on the plugins we have added to our test package.json
   */
  it("creates .corejam/ cache files", async () => {
    //Test the base schema is returned
  });
});