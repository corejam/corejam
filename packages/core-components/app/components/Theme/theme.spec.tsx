import { newSpecPage } from "@stencil/core/testing";
import { UiBase } from "../UIBase/ui-base";
import { Theme } from "./Theme";

const theme = {
  colors: { black: "#fff" },
};
const serialized = JSON.stringify(theme);

it("should render grid compoment", async () => {
  const { doc } = await newSpecPage({
    components: [Theme, UiBase],
    html: `
        <corejam-ui-base></corejam-ui-base>
        <corejam-ui-theme theme=${serialized}></corejam-ui-theme>
    `,
  });

  expect(doc.head.innerText).toContain("--cj-colors-black: #fff");
});
