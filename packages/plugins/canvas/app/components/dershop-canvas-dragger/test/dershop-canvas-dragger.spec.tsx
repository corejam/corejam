import { newSpecPage } from "@stencil/core/testing";
import { DershopCanvasDragger } from "../dershop-canvas-dragger";

describe("dershop-canvas-dragger", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [DershopCanvasDragger],
      html: `<dershop-canvas-dragger></dershop-canvas-dragger>`,
    });
    expect(page.root).toEqualHtml(`
      <dershop-canvas-dragger>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </dershop-canvas-dragger>
    `);
  });
});
