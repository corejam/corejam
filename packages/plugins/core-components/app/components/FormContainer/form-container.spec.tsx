import { newSpecPage } from "@stencil/core/testing";
import { CorejamFormContainer } from "./Container";
import { CorejamFormInput } from "../FormInput/FormInput";
describe("corejam-form-container", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [CorejamFormContainer, CorejamFormInput],
      html: `<corejam-form-container></corejam-form-container>`,
    });
    expect(page).toBeDefined();
  });
});
