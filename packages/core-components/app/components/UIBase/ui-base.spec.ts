import { newSpecPage } from "@stencil/core/testing";
import { UiBase } from "./ui-base";

describe("renders base styling in head", () => {
  it("builds", async () => {
    const page = await newSpecPage({
      components: [UiBase],
      html: `<corejam-ui-base></corejam-ui-base>`,
    });
    const styleTag = page.doc.querySelectorAll("head style#corejam-ui-base");
    expect(styleTag).toBeDefined();
  });
});
