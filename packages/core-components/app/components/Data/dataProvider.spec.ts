import { newSpecPage } from "@stencil/core/testing";
import { coreReset, coreState } from "../../store/core";
import { DataProvider } from "./DataProvider";

beforeEach(coreReset);

describe("data provider component can set the graphql client", () => {
  it("updates url based on prop", async () => {
    await newSpecPage({
      components: [DataProvider],
      html: `<corejam-data-provider url="http://foo.bar"></corejam-data-provider url="www.foo.bar">`,
    });
    //@ts-ignore
    expect(coreState.client).toBeDefined();
  });
});
