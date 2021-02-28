import { Component } from "@stencil/core";
import makeTheme from "./makeTheme";
import reset from "./reset";
import setUserDefaults from "./setUserDefaults";

@Component({
  tag: "corejam-ui-base",
})
export class UiBase {
  async componentWillLoad() {
    const styleRules = `
    ${reset}
    :root {
      ${makeTheme()}
    }
    ${setUserDefaults}
  `;
    const existingTag = document.querySelector("head style#corejam-ui-base");
    if (existingTag) {
      existingTag.innerHTML = styleRules;
    } else {
      const style = document.createElement("style");
      style.id = "corejam-ui-base";
      style.innerHTML = styleRules;
      document.head.appendChild(style);
    }
  }
}
