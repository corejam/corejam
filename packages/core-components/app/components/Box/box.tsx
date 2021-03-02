import { Component, h, Host, Prop, State } from "@stencil/core";
import { Display, Flex, Position } from "./types";

/**
 * @since 2.0
 * @status stable
 *
 * @slot default - The box content. | Type: any
 */
@Component({
  tag: "corejam-box",
})
export class CorejamBox {
  @State() hash: string;

  //@todo check if props are valid
  @Prop() display: Display = "block";
  @Prop({ reflect: true }) smDisplay: Display;
  @Prop({ reflect: true }) mdDisplay: Display;
  @Prop({ reflect: true }) lgDisplay: Display;
  @Prop({ reflect: true }) xlDisplay: Display;
  @Prop({ reflect: true }) flex: Flex.Flex;
  @Prop({ reflect: true }) direction: Flex.Direction;
  @Prop({ reflect: true }) smDirection: Flex.Direction;
  @Prop({ reflect: true }) mdDirection: Flex.Direction;
  @Prop({ reflect: true }) lgDirection: Flex.Direction;
  @Prop({ reflect: true }) xlDirection: Flex.Direction;
  @Prop({ reflect: true }) items: Flex.AlignItems;
  @Prop({ reflect: true }) smItems: Flex.AlignItems;
  @Prop({ reflect: true }) mdItems: Flex.AlignItems;
  @Prop({ reflect: true }) lgIitems: Flex.AlignItems;
  @Prop({ reflect: true }) xlItems: Flex.AlignItems;
  @Prop({ reflect: true }) alignContent: Flex.AlignContent;
  @Prop({ reflect: true }) smAlignContent: Flex.AlignContent;
  @Prop({ reflect: true }) mdAlignContent: Flex.AlignContent;
  @Prop({ reflect: true }) lgAlignContent: Flex.AlignContent;
  @Prop({ reflect: true }) xlAlignContent: Flex.AlignContent;
  @Prop({ reflect: true }) self: Flex.Self;
  @Prop({ reflect: true }) smSelf: Flex.Self;
  @Prop({ reflect: true }) mdSelf: Flex.Self;
  @Prop({ reflect: true }) lgSelf: Flex.Self;
  @Prop({ reflect: true }) xlSelf: Flex.Self;
  @Prop({ reflect: true }) justify: Flex.Justify;
  @Prop({ reflect: true }) smJustify: Flex.Justify;
  @Prop({ reflect: true }) mdJustify: Flex.Justify;
  @Prop({ reflect: true }) lgJustify: Flex.Justify;
  @Prop({ reflect: true }) xljustify: Flex.Justify;
  @Prop({ reflect: true }) wrap: Flex.Wrap;
  @Prop({ reflect: true }) smWrap: Flex.Wrap;
  @Prop({ reflect: true }) mdWrap: Flex.Wrap;
  @Prop({ reflect: true }) lgWrap: Flex.Wrap;
  @Prop({ reflect: true }) xlWrap: Flex.Wrap;
  @Prop({ reflect: true }) flow: Flex.Flow;
  @Prop({ reflect: true }) smFlow: Flex.Flow;
  @Prop({ reflect: true }) mdFlow: Flex.Flow;
  @Prop({ reflect: true }) lgFlow: Flex.Flow;
  @Prop({ reflect: true }) xlFlow: Flex.Flow;
  @Prop({ reflect: true }) order: number;
  @Prop({ reflect: true }) smOrder: number;
  @Prop({ reflect: true }) mdOrder: number;
  @Prop({ reflect: true }) lgOrder: number;
  @Prop({ reflect: true }) xlOrder: number;
  @Prop({ reflect: true }) grow: number;
  @Prop({ reflect: true }) smGrow: number;
  @Prop({ reflect: true }) mdGrow: number;
  @Prop({ reflect: true }) lgGrow: number;
  @Prop({ reflect: true }) xlGrow: number;
  @Prop({ reflect: true }) shrink: number;
  @Prop({ reflect: true }) smShrink: number;
  @Prop({ reflect: true }) mdShrink: number;
  @Prop({ reflect: true }) lgShrink: number;
  @Prop({ reflect: true }) xlShrink: number;
  @Prop({ reflect: true }) basis: number;
  @Prop({ reflect: true }) smBasis: number;
  @Prop({ reflect: true }) mdBasis: number;
  @Prop({ reflect: true }) lgBasis: number;
  @Prop({ reflect: true }) xlBasis: number;
  @Prop({ reflect: true }) w: string;
  @Prop({ reflect: true }) smW: string;
  @Prop({ reflect: true }) mdW: string;
  @Prop({ reflect: true }) lgW: string;
  @Prop({ reflect: true }) xlW: string;
  @Prop({ reflect: true }) minH: string;
  @Prop({ reflect: true }) h: string;
  @Prop({ reflect: true }) smH: string;
  @Prop({ reflect: true }) mdH: string;
  @Prop({ reflect: true }) lgH: string;
  @Prop({ reflect: true }) xlH: string;
  @Prop({ reflect: true }) p: number;
  @Prop({ reflect: true }) smP: number;
  @Prop({ reflect: true }) mdP: number;
  @Prop({ reflect: true }) lgP: number;
  @Prop({ reflect: true }) xlP: number;
  @Prop({ reflect: true }) py: number;
  @Prop({ reflect: true }) smPy: number;
  @Prop({ reflect: true }) mdPy: number;
  @Prop({ reflect: true }) lgPy: number;
  @Prop({ reflect: true }) xlPy: number;
  @Prop({ reflect: true }) px: number;
  @Prop({ reflect: true }) smPx: number;
  @Prop({ reflect: true }) mdPx: number;
  @Prop({ reflect: true }) lgPx: number;
  @Prop({ reflect: true }) xlPx: number;
  @Prop({ reflect: true }) pt: number;
  @Prop({ reflect: true }) smPt: number;
  @Prop({ reflect: true }) mdPt: number;
  @Prop({ reflect: true }) lgPt: number;
  @Prop({ reflect: true }) xlPt: number;
  @Prop({ reflect: true }) pr: number;
  @Prop({ reflect: true }) smPr: number;
  @Prop({ reflect: true }) mdPr: number;
  @Prop({ reflect: true }) lgPr: number;
  @Prop({ reflect: true }) xlPr: number;
  @Prop({ reflect: true }) pb: number;
  @Prop({ reflect: true }) smPb: number;
  @Prop({ reflect: true }) mdPb: number;
  @Prop({ reflect: true }) lgPb: number;
  @Prop({ reflect: true }) xlPb: number;
  @Prop({ reflect: true }) pl: number;
  @Prop({ reflect: true }) smPl: number;
  @Prop({ reflect: true }) mdPl: number;
  @Prop({ reflect: true }) lgPl: number;
  @Prop({ reflect: true }) xlPl: number;
  @Prop({ reflect: true }) m: number;
  @Prop({ reflect: true }) smM: number;
  @Prop({ reflect: true }) mdM: number;
  @Prop({ reflect: true }) lgM: number;
  @Prop({ reflect: true }) xlM: number;
  @Prop({ reflect: true }) my: number;
  @Prop({ reflect: true }) smMy: number;
  @Prop({ reflect: true }) mdMy: number;
  @Prop({ reflect: true }) lgMy: number;
  @Prop({ reflect: true }) xlMy: number;
  @Prop({ reflect: true }) mx: string;
  @Prop({ reflect: true }) smMx: string;
  @Prop({ reflect: true }) mdMx: string;
  @Prop({ reflect: true }) lgMx: string;
  @Prop({ reflect: true }) xlMx: string;
  @Prop({ reflect: true }) mt: number;
  @Prop({ reflect: true }) smMt: number;
  @Prop({ reflect: true }) mdMt: number;
  @Prop({ reflect: true }) lgMt: number;
  @Prop({ reflect: true }) xlMt: number;
  @Prop({ reflect: true }) mr: number;
  @Prop({ reflect: true }) smMr: number;
  @Prop({ reflect: true }) mdMr: number;
  @Prop({ reflect: true }) lgMr: number;
  @Prop({ reflect: true }) xlMr: number;
  @Prop({ reflect: true }) mb: number;
  @Prop({ reflect: true }) smMb: number;
  @Prop({ reflect: true }) mdMb: number;
  @Prop({ reflect: true }) lgMb: number;
  @Prop({ reflect: true }) xlMb: number;
  @Prop({ reflect: true }) ml: number;
  @Prop({ reflect: true }) smMl: number;
  @Prop({ reflect: true }) mdMl: number;
  @Prop({ reflect: true }) lgMl: number;
  @Prop({ reflect: true }) xlMl: number;
  @Prop({ reflect: true }) max: string;
  @Prop({ reflect: true }) smMax: string;
  @Prop({ reflect: true }) mdMax: string;
  @Prop({ reflect: true }) lgMax: string;
  @Prop({ reflect: true }) xlMax: string;
  @Prop({ reflect: true }) bg: string;
  @Prop({ reflect: true }) smBg: string;
  @Prop({ reflect: true }) mdBg: string;
  @Prop({ reflect: true }) lgBg: string;
  @Prop({ reflect: true }) xlBg: string;
  @Prop({ reflect: true }) hoverBg: string;
  @Prop({ reflect: true }) smHoverBg: string;
  @Prop({ reflect: true }) mdHoverBg: string;
  @Prop({ reflect: true }) lgHoverBg: string;
  @Prop({ reflect: true }) xlHoverBg: string;
  @Prop({ reflect: true }) hide: boolean;
  @Prop({ reflect: true }) smHide: boolean;
  @Prop({ reflect: true }) mdHide: boolean;
  @Prop({ reflect: true }) lgHide: boolean;
  @Prop({ reflect: true }) xlHide: boolean;
  @Prop({ reflect: true }) show: string;
  @Prop({ reflect: true }) smShow: string;
  @Prop({ reflect: true }) mdShow: string;
  @Prop({ reflect: true }) lgShow: string;
  @Prop({ reflect: true }) xlShow: string;
  @Prop({ reflect: true }) collapse: "collapse" | "separate";
  @Prop({ reflect: true }) bColor: string;
  @Prop({ reflect: true }) rounded: string;
  @Prop({ reflect: true }) roundedTop: string;
  @Prop({ reflect: true }) roundedRight: string;
  @Prop({ reflect: true }) roundedLeft: string;
  @Prop({ reflect: true }) roundedBottom: string;
  @Prop({ reflect: true }) bStyle: string;
  @Prop({ reflect: true }) bWidth: number;
  @Prop({ reflect: true }) bWidthTop: number;
  @Prop({ reflect: true }) bWidthRight: number;
  @Prop({ reflect: true }) bWidthBottom: number;
  @Prop({ reflect: true }) bWidthLeft: number;
  @Prop({ reflect: true }) animation: string;
  @Prop({ reflect: true }) shadow: string;
  @Prop({ reflect: true }) hoverShadow: string;
  @Prop({ reflect: true }) position: Position;
  @Prop({ reflect: true }) top: number;
  @Prop({ reflect: true }) right: number;
  @Prop({ reflect: true }) bottom: number;
  @Prop({ reflect: true }) left: number;
  @Prop({ reflect: true }) z: number;
  @Prop({ reflect: true }) transition: string;
  @Prop({ reflect: true }) overflow: string;
  @Prop({ reflect: true }) columnCount: string;
  @Prop({ reflect: true }) smColumnCount: string;
  @Prop({ reflect: true }) mdColumnCount: string;
  @Prop({ reflect: true }) lgColumnCount: string;
  @Prop({ reflect: true }) xlColumnCount: string;
  @Prop({ reflect: true }) columnFill: string;
  @Prop({ reflect: true }) smColumnFill: string;
  @Prop({ reflect: true }) mdColumnFill: string;
  @Prop({ reflect: true }) lgColumnFill: string;
  @Prop({ reflect: true }) xlColumnFill: string;
  @Prop({ reflect: true }) columnRuleColor: string;
  @Prop({ reflect: true }) smColumnRuleColor: string;
  @Prop({ reflect: true }) mdColumnRuleColor: string;
  @Prop({ reflect: true }) lgColumnRuleColor: string;
  @Prop({ reflect: true }) xlColumnRuleColor: string;
  @Prop({ reflect: true }) columnRuleStyle: string;
  @Prop({ reflect: true }) smColumnRuleStyle: string;
  @Prop({ reflect: true }) mdColumnRuleStyle: string;
  @Prop({ reflect: true }) lgColumnRuleStyle: string;
  @Prop({ reflect: true }) xlColumnRuleStyle: string;
  @Prop({ reflect: true }) columnRuleWidth: string;
  @Prop({ reflect: true }) smColumnRuleWidth: string;
  @Prop({ reflect: true }) mdColumnRuleWidth: string;
  @Prop({ reflect: true }) lgColumnRuleWidth: string;
  @Prop({ reflect: true }) xlColumnRuleWidth: string;
  @Prop({ reflect: true }) columnSpan: string;
  @Prop({ reflect: true }) smColumnSpan: string;
  @Prop({ reflect: true }) mdColumnSpan: string;
  @Prop({ reflect: true }) lgColumnSpan: string;
  @Prop({ reflect: true }) xlColumnSpan: string;

  @Prop({ reflect: true }) droppableElements = ["corejam-box"];

  async componentWillRender() {
    const hash = await (await import("../../utils/style")).calculateStyles(this);
    this.hash = hash;
  }

  render() {
    return (
      <Host class={this.hash}>
        <slot></slot>
      </Host>
    );
  }
}
