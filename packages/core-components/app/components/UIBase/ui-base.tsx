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
      const finalResult = computedStyleString.replace(/\/\*(.|[\r\n])*?\*\//g, "");
      if (!existingTag) {
        addStyleTagToHead(finalResult, "corejam-ui-base");
      }
    }
  }
}
