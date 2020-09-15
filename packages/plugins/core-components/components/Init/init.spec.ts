import { Init } from "./Init";
import { newSpecPage } from "@stencil/core/testing";

describe("dershop-init", () => {
  it("builds", async () => {
    const page = await newSpecPage({
      components: [Init],
      html: `<corejam-init></corejam-init>`,
    });
    expect(page).toBeTruthy();
  });
});
