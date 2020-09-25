import { newSpecPage } from "@stencil/core/testing";
import { CorejamPagination } from "../corejam-pagination";

describe("corejam-pagination", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [CorejamPagination],
      html: `<corejam-pagination></corejam-pagination>`,
    });
    expect(page.root).toBeDefined();
  });
});
