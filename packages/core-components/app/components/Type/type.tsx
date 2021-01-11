import { Component, h, Prop, State, Watch } from "@stencil/core";
import { Font, General } from "./types";

@Component({
  tag: "corejam-type",
})
export class CorejamType {
  @State() hash: string;
  @Prop({ reflect: true }) family: Font.Family;
  @Prop({ reflect: true }) weight: Font.Weight;
  @Prop({ reflect: true }) size: Font.Size;
  @Prop({ reflect: true }) smooth: Font.Smoothnes;
  @Prop({ reflect: true }) fontStyle: Font.Style;
  @Prop({ reflect: true }) spacing: Font.Spacing;
  @Prop({ reflect: true }) decoration: Font.Decoration;
  @Prop({ reflect: true }) mdWeight: Font.Weight;
  @Prop({ reflect: true }) lgFocusWeight: string;
  @Prop({ reflect: true }) transform: Font.Transform;
  @Prop({ reflect: true }) textStyle: string;
  @Prop({ reflect: true }) align: Font.Align;
  @Prop({ reflect: true }) lineHeight: Font.lineHeight;
  @Prop({ reflect: true }) color: General.Color;
  @Prop({ reflect: true }) as: Font.As = "span";

  @Prop({ reflect: false, mutable: true }) droppableElements = ["corejam-box"];

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
      <Type class={this.hash}>
        <slot />
      </Type>
    );
  }
}
