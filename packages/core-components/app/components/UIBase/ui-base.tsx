import { Component } from "@stencil/core";
import { addStyleTagToHead } from "../../utils/utils";
import { makeDefaults, makeTheme } from "./makeTheme";
import reset from "./reset";

@Component({
  tag: "corejam-ui-base",
})
export class UiBase {
  async componentWillLoad() {
    const computedStyleString = `
    ${reset}
    ${makeDefaults()}
    :root {
      ${makeTheme()}
    }
  `;

    const existingTag = document.querySelectorAll("head style#corejam-ui-base").length > 0;

    if (process.env.NODE_ENV === "development") {
      if (existingTag) {
        existingTag[0].innerHTML = computedStyleString;
      } else {
        addStyleTagToHead(computedStyleString, "corejam-ui-base");
      }
    } else {
      const postcss = await import("postcss").then((postcss) => postcss.default);
      const nano = await import("cssnano").then((cssnano) => cssnano.default);

      //@ts-ignore
      const finalResult = await postcss([nano]).process(computedStyleString, { from: undefined });

      if (existingTag) {
        existingTag[0].innerHTML = finalResult.css;
      } else {
        addStyleTagToHead(finalResult.css, "corejam-ui-base");
      }
    }
  }
}
