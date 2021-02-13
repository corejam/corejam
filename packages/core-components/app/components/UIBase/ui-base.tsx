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
      const clean = await import("clean-css").then((clean) => clean.default);
      const finalResult = new clean().minify(computedStyleString).styles;
      if (existingTag) {
        existingTag[0].innerHTML = finalResult;
      } else {
        addStyleTagToHead(finalResult, "corejam-ui-base");
      }
    }
  }
}
