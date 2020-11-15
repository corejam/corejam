import { Component, h, Prop, State, Watch, Host } from "@stencil/core";
import { Font, General } from "./types";

@Component({
  tag: "corejam-type",
})
export class CorejamType {
  @State() hash: string;
  @Prop() family: Font.Family;
  @Prop() weight: Font.Weight;
  @Prop() size: Font.Size;
  @Prop() smooth: Font.Smoothnes;
  @Prop() fontStyle: Font.Style;
  @Prop() spacing: Font.Spacing;
  @Prop() decoration: Font.Decoration;
  @Prop() mdWeight: Font.Weight;
  @Prop() lgFocusWeight: string;
  @Prop() transform: Font.Transform;
  @Prop() style: string;
  @Prop() align: Font.Align;
  @Prop() lineHeight: Font.lineHeight;
  @Prop() color: General.Color;
  @Prop() as: Font.As = "span";

  @Prop({ reflect: false, mutable: true }) droppableElements = ["dershop-ui-box", "dershop-ui-grid"];

  async componentWillLoad() {
    await this.computeStyles();
  }

  @Watch("color")
  @Watch("family")
  @Watch("size")
  @Watch("fontStyle")
  @Watch("spacing")
  @Watch("decoration")
  @Watch("transform")
  @Watch("align")
  async computeStyles() {
    const hash = await (await import("../../utils/style")).calculateStyles(this);
    this.hash = hash;
  }

  render() {
    const Type = this.as;
    return (
      <Host>
        <Type class={this.hash}>
          <slot></slot>
        </Type>
      </Host>
    );
  }
}
