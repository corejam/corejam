import { newSpecPage } from "@stencil/core/testing";
import { CorejamFormInput } from "../FormInput/FormInput";
import { CorejamFormContainer } from "./Container";
describe("corejam-form-container", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [CorejamFormContainer, CorejamFormInput],
      html: `<corejam-form-container></corejam-form-container>`,
    });
    expect(page).toBeDefined();
  });
});
