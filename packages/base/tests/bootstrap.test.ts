import { collectPlugins, bootstrapSchema } from "@corejam/base/src/Bootstrap";
import { readFileSync, unlinkSync } from "fs";

describe("Bootstrap", () => {
  it("collectsPluginsCorrectly", async () => {
    //We should only get plugins back that have server side resolvers
    expect(collectPlugins()).toHaveLength(2);
  });

  /**
   * We are expecting certain types based on the plugins we have added to our test package.json
   */
  it("creates .corejam/ cache file", async () => {
    //Clean
    try {
      unlinkSync(process.cwd() + "/schema.json")
      unlinkSync(process.cwd() + "/resolvers.js")
    } catch (e) {
      //Nothing to clean
    }

    const result = (await bootstrapSchema()) as any;
    expect(result).toHaveProperty("__schema");

    let types: Array<string> = [];

    result.__schema.types.map((type) => {
      types.push(type.name);
    });

    expect(types).toEqual(expect.arrayContaining(["User", "UserJWT", "Paginated", "userRoles"]));

    //We expect cache to have been written
    expect(readFileSync(process.cwd() + "/.corejam/schema.json", "utf-8")).toEqual(JSON.stringify(result));

    //Get it from cache this time
    const cachedResult = (await bootstrapSchema()) as any;
    expect(cachedResult).toHaveProperty("__schema");
  });
});
