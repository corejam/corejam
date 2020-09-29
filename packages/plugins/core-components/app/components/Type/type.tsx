import { Component, h, Prop, State, Watch, Host } from "@stencil/core";
import { Font, General } from "./types";
import { Style } from "../../helpers/Style";
import { computeStyle } from "../../utils/computeStyle";

@Component({
  tag: "corejam-type",
  shadow: true,
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
  /**
   * Holds current style string in state.
   * Is used to be rendered out by a functional component.
   */
  @State() style: any[] = [];
  @State() computedStyle: string;
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
      this.style = (await import("../../utils/style")).generateStyleMap(this, this.as);
      res();
    });
  }

  @Watch("style")
  generateFinalStyleTags() {
    const [hashCode, style] = computeStyle(this.style);
    (this.hash = hashCode), (this.computedStyle = style);
  }
  render() {
    const Type = this.as;
    return (
      <Host>
        <Type class={this.hash}>
          <slot></slot>
        </Type>
        {this.hash && <Style styles={this.computedStyle} hash={this.hash} />}
      </Host>
    );
  }
}
