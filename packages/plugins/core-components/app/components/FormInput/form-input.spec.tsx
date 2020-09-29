import { newSpecPage } from "@stencil/core/testing";
import { CorejamFormInput } from "./FormInput";

describe("dershop-form-input", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [CorejamFormInput],
      html: `<corejam-form-input></corejam-form-input>`,
    });
    expect(page.root).toBeDefined();
  });
});
