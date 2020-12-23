import { collectPlugins, bootstrapSchema, loadManifest } from "@corejam/base/src/Bootstrap";
import { unlinkSync } from "fs";

describe("Bootstrap", () => {
  it("collectsPluginsCorrectly", async () => {
    //We should only get plugins back that have server side resolvers
    expect(collectPlugins()).toHaveLength(1);

    //In the manifest we should have process.cwd() listed too as we are inside a plugin
    expect(loadManifest().plugins).toHaveLength(3)
  });

  /**
   * We are expecting certain types based on the plugins we have added to our test package.json
   */
  it("creates .corejam/ cache file", async () => {
    //Clean
    try {
      unlinkSync(process.cwd() + "/resolvers.js")
    } catch (e) {
      //Nothing to clean
    }

    const result = (await bootstrapSchema()) as any;
    expect(result).toContain("extend type User")
    expect(result).toContain("type Deliverability")
    expect(result).toContain("input OrderItemInput")
  });
});
