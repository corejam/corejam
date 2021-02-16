import { Component, h, Host } from "@stencil/core";
import makeTheme from "./makeTheme";
import reset from "./reset";

@Component({
  tag: "corejam-ui-base",
})
export class UiBase {
  async componentWillLoad() {
    const styleRules = `
    ${reset}
    * {
      box-sizing: border-box;
    }
    body {
      font-family: var(--cj-font-sans);
    }
    :root {
      ${makeTheme()}
      --cj-color-primary: var(--cj-color-black);
      --cj-color-secondary: var(--cj-color-gray-800);
    }
  `;
    const existingTag = document.querySelectorAll("head style#corejam-ui-base");
    if (existingTag.length > 0) {
      existingTag[0].innerHTML = styleRules;
    } else {
      const style = document.createElement("style");
      style.id = "corejam-ui-base";
      style.innerHTML = styleRules;
      document.head.appendChild(style);
    }
  }
  render() {
    return <Host></Host>;
  }
}
