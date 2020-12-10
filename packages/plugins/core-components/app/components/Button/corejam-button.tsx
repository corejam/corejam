import { Component, h, Prop, State, Watch } from "@stencil/core";
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
  @Prop() bg: string;
  @Prop() hoverBg: string;
  @Prop() focusBg: string;
  @Prop() outline = "none";
  @Prop() hoverOutline = "none";
  @Prop() focusOutline = "none";
  @Prop() type: Button.Type = "button";
  @Prop() color: string;
  @Prop() hoverColor: string;
  @Prop() focusColor: string;
  @Prop() p: string;
  @Prop() pl: string;
  @Prop() pr: string;
  @Prop() pt: string;
  @Prop() pb: string;
  @Prop() transition: string;
  @Prop() duration: number;
  @Prop() timing: string;
  @Prop() delay: number;
  @Prop() animation: string;
  @Prop() rounded: string;

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
  @Watch("outline")
  @Watch("hoverOutline")
  @Watch("focusOutline")
  @Watch("transition")
  async computeStyles() {
    const hash = await (await import("../../utils/style")).calculateStyles(this);
    this.hash = hash;
  }
  render() {
    const Tag = this.type;
    return (
      <Tag class={this.hash}>
        <slot></slot>
      </Tag>
    );
  }
}
