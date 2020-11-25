import { Component, Host, h, Prop, State, Watch } from "@stencil/core";
import { Button } from "./types";

@Component({
  tag: "corejam-button",
})
export class CorejamButton {
  @State() hash: string;
  @Prop() display = "flex";
  @Prop() justify = "center";
  @Prop() w: number | string;
  @Prop() smW: number | string;
  @Prop() mdW: number | string;
  @Prop() lgW: number | string;
  @Prop() xlW: number | string;
  @Prop({ reflect: true }) bg: string;
  @Prop({ reflect: true }) hoverBg: string;
  @Prop({ reflect: true }) focusBg: string;
  @Prop({ reflect: true }) type: Button.Type = "button";
  @Prop({ reflect: true }) color: string;
  @Prop({ reflect: true }) hoverColor: string;
  @Prop({ reflect: true }) focusColor: string;
  @Prop({ reflect: true }) p: string;
  @Prop({ reflect: true }) pl: string;
  @Prop({ reflect: true }) pr: string;
  @Prop({ reflect: true }) pt: string;
  @Prop({ reflect: true }) pb: string;

  async componentWillLoad() {
    await this.computeStyles();
  }

  @Watch("display")
  @Watch("w")
  @Watch("smW")
  @Watch("mdW")
  @Watch("lgW")
  @Watch("xlW")
  @Watch("bg")
  @Watch("hoverBg")
  @Watch("focusBg")
  @Watch("color")
  @Watch("hoverColor")
  @Watch("focusColor")
  @Watch("p")
  @Watch("pl")
  @Watch("pr")
  @Watch("pt")
  @Watch("pb")
  async computeStyles() {
    const hash = await (await import("../../utils/style")).calculateStyles(this);
    this.hash = hash;
  }
  render() {
    const Tag = this.type;
    return (
      <Host class={this.hash} role="button">
        <Tag>
          <slot></slot>
        </Tag>
      </Host>
    );
  }
}
