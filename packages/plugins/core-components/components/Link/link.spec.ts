import { BaseLink } from "./Link";
import { newSpecPage } from "@stencil/core/testing";

describe("dershop-base-link renders", () => {
  it("builds", async () => {
    const page = await newSpecPage({
      components: [BaseLink],
      html: `<corejam-base-link href="/test">Hallo</corejam-base-link>`,
    });
    expect(page).toBeTruthy();
  });
});
