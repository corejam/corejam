import { Component, h, Host, Prop } from "@stencil/core";
import makeTheme from "../UIBase/makeTheme";

@Component({
  tag: "corejam-ui-theme",
})
export class ThemeProvider {
  @Prop() theme: object | string = null;

  async componentWillRender() {
    if (this.theme) {
      const userConfig = typeof this.theme === "string" ? JSON.parse(this.theme) : this.theme;
      const userTheme = makeTheme(userConfig);
      const existingTag = document.querySelectorAll("head style#corejam-user-style");
      if (userTheme.length > 0) {
        if (existingTag.length > 0) {
          existingTag[0].innerHTML = `
            :root {
              ${userTheme}
            }
          `;
        } else {
          const style = document.createElement("style");
          style.id = "corejam-user-style";
          style.innerHTML = `
          :root {
            ${userTheme}
          }
        `;
          document.head.appendChild(style);
        }
      }
    }
  }

  render() {
    return <Host></Host>;
  }
}
