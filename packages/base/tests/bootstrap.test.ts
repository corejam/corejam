import { collectPlugins, importPlugin, isAPlugin } from "../src/Bootstrap";
import { PluginLoadError } from "../src/Errors";

describe("Bootstrap", () => {
  it("collectsPluginsCorrectly", async () => {
    //Mock some plugins here
    expect(collectPlugins()).toEqual([]);
  });

  /**
   * We are expecting certain types based on the plugins we have added to our test package.json
   */
  it("creates .corejam/ cache files", async () => {
    //Test the base schema is returned
  });

  it("Loading non existing plugin throws PluginLoadError", async () => {
    try {
      await importPlugin("madeUpPlugin");
    } catch (e) {
      expect(e).toBeInstanceOf(PluginLoadError);
    }

    try {
      await importPlugin("/random/path");
    } catch (e) {
      expect(e).toBeInstanceOf(PluginLoadError);
    }
  });

  /**
   * TODO we need to mock require resolve: https://github.com/facebook/jest/issues/9543
   */
  it.skip("Checks if package is a corejam plugin", async () => {
    //Test the base schema is returned
    expect(isAPlugin()).toEqual(false);

    jest.mock(
      "@randomPackage/package.json",
      () => ({
        corejam: {},
      }),
      { virtual: true }
    );

    expect(isAPlugin("@randomPackage")).toEqual(true);
  });
});
