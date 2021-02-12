import { newSpecPage } from "@stencil/core/testing";
import { Grid } from "../../components/Grid/Grid";

it("should prefix grid prop", async () => {
  const page = await newSpecPage({
    components: [Grid],
    html: `<corejam-grid>hallo</corejam-grid>`,
  });
  expect(page.doc.head.textContent).toContain("display: -ms-grid;");
});
