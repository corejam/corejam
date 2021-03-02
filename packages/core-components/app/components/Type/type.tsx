import { Component, h, Prop, State } from "@stencil/core";
import { Font, General } from "./types";

@Component({
  tag: "corejam-type",
})
export class CorejamType {
  @State() hash: string;
  @Prop({ reflect: true }) family: Font.Family;
  @Prop({ reflect: true }) weight: Font.Weight;
  @Prop({ reflect: true }) mdWeight: Font.Weight;
  @Prop({ reflect: true }) smWeight: Font.Weight;
  @Prop({ reflect: true }) lgWeight: Font.Weight;
  @Prop({ reflect: true }) xlWeight: Font.Weight;
  @Prop({ reflect: true }) size: Font.Size;
  @Prop({ reflect: true }) smSize: Font.Size;
  @Prop({ reflect: true }) mdSize: Font.Size;
  @Prop({ reflect: true }) lgSize: Font.Size;
  @Prop({ reflect: true }) xlSize: Font.Size;
  @Prop({ reflect: true }) focusWeight: string;
  @Prop({ reflect: true }) smFocusWeight: string;
  @Prop({ reflect: true }) mdFocusWeight: string;
  @Prop({ reflect: true }) lgFocusWeight: string;
  @Prop({ reflect: true }) xlFocusWeight: string;
  @Prop({ reflect: true }) smooth: Font.Smoothnes;
  @Prop({ reflect: true }) fontStyle: Font.Style;
  @Prop({ reflect: true }) smFontStyle: Font.Style;
  @Prop({ reflect: true }) mdFontStyle: Font.Style;
  @Prop({ reflect: true }) lgFontStyle: Font.Style;
  @Prop({ reflect: true }) xlFontStyle: Font.Style;
  @Prop({ reflect: true }) spacing: Font.Spacing;
  @Prop({ reflect: true }) amSpacing: Font.Spacing;
  @Prop({ reflect: true }) mdSpacing: Font.Spacing;
  @Prop({ reflect: true }) lgSpacing: Font.Spacing;
  @Prop({ reflect: true }) xlSpacing: Font.Spacing;
  @Prop({ reflect: true }) decoration: Font.Decoration;
  @Prop({ reflect: true }) smDecoration: Font.Decoration;
  @Prop({ reflect: true }) mdDecoration: Font.Decoration;
  @Prop({ reflect: true }) lgDecoration: Font.Decoration;
  @Prop({ reflect: true }) xlDecoration: Font.Decoration;
  @Prop({ reflect: true }) transform: Font.Transform;
  @Prop({ reflect: true }) smTransform: Font.Transform;
  @Prop({ reflect: true }) mdTransform: Font.Transform;
  @Prop({ reflect: true }) lgTransform: Font.Transform;
  @Prop({ reflect: true }) xlTransform: Font.Transform;
  @Prop({ reflect: true }) textStyle: string;
  @Prop({ reflect: true }) smTextStyle: string;
  @Prop({ reflect: true }) mdTextStyle: string;
  @Prop({ reflect: true }) lgTextStyle: string;
  @Prop({ reflect: true }) xlTextStyle: string;
  @Prop({ reflect: true }) align: Font.Align;
  @Prop({ reflect: true }) smAlign: Font.Align;
  @Prop({ reflect: true }) mdAlign: Font.Align;
  @Prop({ reflect: true }) lgAlign: Font.Align;
  @Prop({ reflect: true }) xlAlign: Font.Align;
  @Prop({ reflect: true }) lineHeight: Font.lineHeight;
  @Prop({ reflect: true }) smLineHeight: Font.lineHeight;
  @Prop({ reflect: true }) mdLineHeight: Font.lineHeight;
  @Prop({ reflect: true }) lgLineHeight: Font.lineHeight;
  @Prop({ reflect: true }) xlLineHeight: Font.lineHeight;
  @Prop({ reflect: true }) color: General.Color;
  @Prop({ reflect: true }) smColor: General.Color;
  @Prop({ reflect: true }) mdColor: General.Color;
  @Prop({ reflect: true }) lgColor: General.Color;
  @Prop({ reflect: true }) XlColor: General.Color;
  @Prop({ reflect: true }) as: Font.As = "span";

  @Prop({ reflect: false, mutable: true }) droppableElements = ["corejam-box"];

  async componentWillRender() {
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
