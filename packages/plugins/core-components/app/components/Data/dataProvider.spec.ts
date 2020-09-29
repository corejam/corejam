import { DataProvider } from "./DataProvider";
import { newSpecPage } from "@stencil/core/testing";
import { coreState, coreReset } from "../../store/core";

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
