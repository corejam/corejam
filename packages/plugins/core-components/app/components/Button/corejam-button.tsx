import { Component, h, Prop, State, Watch } from "@stencil/core";

@Component({
  tag: "corejam-button",
})
export class CorejamButton {
  @State() hash: string;
  @Prop({ reflect: true }) display = "flex";
  @Prop({ reflect: true }) justify = "center";
  @Prop({ reflect: true }) w: number | string;
  @Prop({ reflect: true }) smW: number | string;
  @Prop({ reflect: true }) mdW: number | string;
  @Prop({ reflect: true }) lgW: number | string;
  @Prop({ reflect: true }) xlW: number | string;
  @Prop({ reflect: true }) bg: string;
  @Prop({ reflect: true }) hoverBg: string;
  @Prop({ reflect: true }) focusBg: string;
  @Prop({ reflect: true }) outline = "none";
  @Prop({ reflect: true }) hoverOutline = "none";
  @Prop({ reflect: true }) focusOutline = "none";
  @Prop({ reflect: true }) type: "a" | "button" | "reset" = "button";
  @Prop({ reflect: true }) color: string;
  @Prop({ reflect: true }) hoverColor: string;
  @Prop({ reflect: true }) focusColor: string;
  @Prop({ reflect: true }) p: string;
  @Prop({ reflect: true }) pl: string;
  @Prop({ reflect: true }) pr: string;
  @Prop({ reflect: true }) pt: string;
  @Prop({ reflect: true }) pb: string;
  @Prop({ reflect: true }) transition: string;
  @Prop({ reflect: true }) duration: number;
  @Prop({ reflect: true }) timing: string;
  @Prop({ reflect: true }) delay: number;
  @Prop({ reflect: true }) animation: string;
  @Prop({ reflect: true }) rounded: string;

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
