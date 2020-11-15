import { Component, Host, h, Prop, State } from "@stencil/core";
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

  async componentWillLoad() {
    await this.computeStyles();
  }

  async computeStyles() {
    const hash = await (await import("../../utils/style")).calculateStyles(this);
    this.hash = hash;
  }
  render() {
    return (
      <Host as="button" type={this.type} class={this.hash}>
        <slot></slot>
      </Host>
    );
  }
}
