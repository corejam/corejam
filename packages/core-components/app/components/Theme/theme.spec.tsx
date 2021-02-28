import { newSpecPage } from "@stencil/core/testing";
import { UiBase } from "../UIBase/ui-base";
import { Theme } from "./Theme";

it("should override default values", async () => {
  const pageBefore = await newSpecPage({
    components: [Theme, UiBase],
    html: `
            <corejam-ui-base></corejam-ui-base>
        `,
  });

  const theme = {
    colors: { black: "#fff" },
  };

  expect(pageBefore.doc.head.innerText).toContain("--cj-colors-black: #000");

  const { doc } = await newSpecPage({
    components: [Theme, UiBase],
    html: `
        <corejam-ui-base></corejam-ui-base>
        <corejam-ui-theme theme=${JSON.stringify(theme)}></corejam-ui-theme>
    `,
  });

  expect(doc.head.innerText).toContain("--cj-colors-black: #fff");
});

it("should set new color value", async () => {
  const theme = {
    colors: { corejam: "golden" },
  };
  const { doc } = await newSpecPage({
    components: [Theme, UiBase],
    html: `
          <corejam-ui-base></corejam-ui-base>
          <corejam-ui-theme theme=${JSON.stringify(theme)}></corejam-ui-theme>
      `,
  });

  expect(doc.head.innerText).toContain("--cj-colors-corejam: golden");
});

it("should set random user defined value", async () => {
  const theme = {
    agency: { corejam: "green" },
  };
  const { doc } = await newSpecPage({
    components: [Theme, UiBase],
    html: `
            <corejam-ui-base></corejam-ui-base>
            <corejam-ui-theme theme=${JSON.stringify(theme)}></corejam-ui-theme>
        `,
  });

  expect(doc.head.innerText).toContain("--cj-agency-corejam: green");
});
