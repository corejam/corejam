import { Component, h, Host, Prop } from "@stencil/core";
import { getAllRootCSSVars } from "../../helpers/getAllDefinedCSSVars";
import { rgbToHsl, hexToHSL } from "../../helpers/colorTransforms";

@Component({
  tag: "corejam-ui-theme",
})
export class ThemeProvider {
  @Prop() theme: object | string = null;

  async componentWillRender() {
    const styleRules = await this.generateVarsWithValues();
    const existingTag = document.querySelectorAll("head style#corejam-user-style");
    if (styleRules.length > 0) {
      if (existingTag.length > 0) {
        existingTag[0].innerHTML = styleRules;
      } else {
        const style = document.createElement("style");
        style.id = "corejam-user-style";
        style.innerHTML = styleRules;
        document.head.appendChild(style);
      }
    }
  }
  async generateVarsWithValues() {
    const definedVars = getAllRootCSSVars();
    if (this.theme) {
      const userConfig = typeof this.theme === "string" ? JSON.parse(this.theme) : this.theme;
      const keys = Object.keys(userConfig);
      let userRules = [];
      keys.forEach((k) => {
        const varName = `--cj-${k}`;
        if (definedVars.includes(varName)) {
          if (userConfig[k].indexOf("rgb") > -1) {
            return userRules.push(`${`--cj-${k}`}: ${rgbToHsl(userConfig[k]).join(",")}`);
          }
          if (userConfig[k].indexOf("#") > -1) {
            return userRules.push(`${`--cj-${k}`}: ${hexToHSL(userConfig[k]).join(",")}`);
          }
          userRules.push(`${`--cj-${k}`}: ${userConfig[k]}`);
        }
      });
      return `:root \n{ ${userRules.join(";\n")} \n}`;
    }
    return "";
  }
  render() {
    return <Host></Host>;
  }
}
