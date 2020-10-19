import { Component, Host, h, Prop, State } from "@stencil/core";
import { computeStyle } from "./../../utils/computeStyle";
import { addStyleTagToHead } from "./../../helpers/Style";
import { Button } from "./types";

@Component({
  tag: "corejam-button",
})
export class CorejamButton {
  @State() hash: string;
  @Prop({ reflect: true }) bg: string;
  @Prop({ reflect: true }) type: Button.Type = "button";
  @Prop({ reflect: true }) color: string;
  @Prop({ reflect: true }) p: string;
  @Prop({ reflect: true }) pl: string;
  @Prop({ reflect: true }) pr: string;
  @Prop({ reflect: true }) pt: string;
  @Prop({ reflect: true }) pb: string;

  _relevantProps = ["bg", "color", "p", "pl", "pr", "pt", "pb"];

  async componentWillLoad() {
    await this.computeStyles();
  }

  async computeStyles() {
    return new Promise(async (res) => {
      const styleMap = (await import("../../utils/style")).generateStyleMap(this, "");
      const [hashCode, style] = computeStyle(styleMap);
      this.hash = hashCode;
      addStyleTagToHead(style, hashCode);
      res();
    });
  }

  render() {
    return (
      <Host as="button" type={this.type} class={this.hash}>
        <slot></slot>
      </Host>
    );
  }
}
