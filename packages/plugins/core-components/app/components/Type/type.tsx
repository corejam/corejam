import { Component, h, Prop, State, Watch, Host } from "@stencil/core";
import { Font, General } from "./types";
import { addStyleTagToHead } from "../../helpers/Style";
import { computeStyle } from "../../utils/computeStyle";

@Component({
  tag: "corejam-type",
})
export class CorejamType {
  _relevantProps = [
    "color",
    "size",
    "fontStyle",
    "spacing",
    "decoration",
    "transform",
    "align",
    "weight",
    "lineHeight",
  ];

  @State() hash: string;
  @Prop() family: Font.Family;
  @Prop() weight: Font.Weight;
  @Prop() size: Font.Size;
  @Prop() smooth: Font.Smoothnes;
  @Prop() fontStyle: Font.Style;
  @Prop() spacing: Font.Spacing;
  @Prop() decoration: Font.Decoration;
  @Prop() transform: Font.Transform;
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
    return new Promise(async (res) => {
      const styleMap = (await import("../../utils/style")).generateStyleMap(this, "");
      const [hashCode, style] = computeStyle(styleMap);
      this.hash = hashCode;
      addStyleTagToHead(style, hashCode);
      res();
    });
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
