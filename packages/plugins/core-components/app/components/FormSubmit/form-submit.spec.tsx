import { newSpecPage } from "@stencil/core/testing";
import { CorejamFormSubmit } from "./form-submit";

describe("corejam-form-submit", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [CorejamFormSubmit],
      html: `<corejam-form-submit form-id="test"></corejam-form-submit>`,
    });
    expect(page.root).toEqualHtml(`
      <corejam-form-submit data-cy="submit-test" form-id="test">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </corejam-form-submit>
    `);
  });
});
