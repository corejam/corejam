import { Component, Host, h, Prop, State, Watch } from "@stencil/core";
import { computeStyle } from "./../../utils/computeStyle";
import { Style } from "./../../helpers/Style";
import { Button } from "./types";

@Component({
  tag: "corejam-button",
  shadow: true,
})
export class CorejamButton {
  @State() style: any[] = [];
  @State() computedStyle: string;
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
      this.style = [...this.style, ...(await import("../../utils/style")).generateStyleMap(this, "")];
      res();
    });
  }

  @Watch("style")
  generateFinalStyleTags() {
    const [hashCode, style] = computeStyle(this.style);
    if (hashCode) {
      this.hash = hashCode;
      this.computedStyle = style;
    }
  }

  render() {
    return (
      <Host as="button" type={this.type} class={this.hash}>
        <slot></slot>
        {this.hash && <Style styles={this.computedStyle} hash={this.hash} />}
      </Host>
    );
  }
}
