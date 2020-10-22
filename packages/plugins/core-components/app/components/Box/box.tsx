import { Component, Host, h, Prop, State } from "@stencil/core";
import { Flex, Position, Display } from "./types";
import { addStyleTagToHead } from "../../helpers/Style";
import { computeStyle } from "../../utils/computeStyle";

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

  @Prop() flex: Flex.Flex;
  @Prop() display: Display;
  @Prop() smDisplay: Display;
  @Prop() mdDisplay: Display;
  @Prop() lgDisplay: Display;
  @Prop() xlDisplay: Display;
  @Prop() direction: Flex.Direction;
  @Prop() smDirection: Flex.Direction;
  @Prop() mdDirection: Flex.Direction;
  @Prop() lgDirection: Flex.Direction;
  @Prop() xlDirection: Flex.Direction;
  @Prop() items: Flex.AlignItems;
  @Prop() smItems: Flex.AlignItems;
  @Prop() mdItems: Flex.AlignItems;
  @Prop() lgIitems: Flex.AlignItems;
  @Prop() xlItems: Flex.AlignItems;
  @Prop() alignContent: Flex.AlignContent;
  @Prop() smAlignContent: Flex.AlignContent;
  @Prop() mdAlignContent: Flex.AlignContent;
  @Prop() lgAlignContent: Flex.AlignContent;
  @Prop() xlAlignContent: Flex.AlignContent;
  @Prop() self: Flex.Self;
  @Prop() smSelf: Flex.Self;
  @Prop() mdSelf: Flex.Self;
  @Prop() lgSelf: Flex.Self;
  @Prop() xlSelf: Flex.Self;
  @Prop() justify: Flex.Justify;
  @Prop() smJustify: Flex.Justify;
  @Prop() mdJustify: Flex.Justify;
  @Prop() lgJustify: Flex.Justify;
  @Prop() xljustify: Flex.Justify;
  @Prop() wrap: Flex.Wrap;
  @Prop() smWrap: Flex.Wrap;
  @Prop() mdWrap: Flex.Wrap;
  @Prop() lgWrap: Flex.Wrap;
  @Prop() xlWrap: Flex.Wrap;
  @Prop() flow: Flex.Flow;
  @Prop() smFlow: Flex.Flow;
  @Prop() mdFlow: Flex.Flow;
  @Prop() lgFlow: Flex.Flow;
  @Prop() xlFlow: Flex.Flow;
  @Prop() order: number;
  @Prop() smOrder: number;
  @Prop() mdOrder: number;
  @Prop() lgOrder: number;
  @Prop() xlOrder: number;
  @Prop() grow: number;
  @Prop() smGrow: number;
  @Prop() mdGrow: number;
  @Prop() lgGrow: number;
  @Prop() xlGrow: number;
  @Prop() shrink: number;
  @Prop() smShrink: number;
  @Prop() mdShrink: number;
  @Prop() lgShrink: number;
  @Prop() xlShrink: number;
  @Prop() basis: number;
  @Prop() smBasis: number;
  @Prop() mdBasis: number;
  @Prop() lgBasis: number;
  @Prop() xlBasis: number;
  @Prop() w: number | string;
  @Prop() smW: number | string;
  @Prop() mdW: number | string;
  @Prop() lgW: number | string;
  @Prop() xlW: number | string;
  @Prop() h: string;
  @Prop() smH: string;
  @Prop() mdH: string;
  @Prop() lgH: string;
  @Prop() xlH: string;
  @Prop() p: number;
  @Prop() smP: number;
  @Prop() mdP: number;
  @Prop() lgP: number;
  @Prop() xlP: number;
  @Prop() py: number;
  @Prop() smPy: number;
  @Prop() mdPy: number;
  @Prop() lgPy: number;
  @Prop() xlPy: number;
  @Prop() px: number;
  @Prop() smPx: number;
  @Prop() mdPx: number;
  @Prop() lgPx: number;
  @Prop() xlPx: number;
  @Prop() pt: number;
  @Prop() smPt: number;
  @Prop() mdPt: number;
  @Prop() lgPt: number;
  @Prop() xlPt: number;
  @Prop() pr: number;
  @Prop() smPr: number;
  @Prop() mdPr: number;
  @Prop() lgPr: number;
  @Prop() xlPr: number;
  @Prop() pb: number;
  @Prop() smPb: number;
  @Prop() mdPb: number;
  @Prop() lgPb: number;
  @Prop() xlPb: number;
  @Prop() pl: number;
  @Prop() smPl: number;
  @Prop() mdPl: number;
  @Prop() lgPl: number;
  @Prop() xlPl: number;
  @Prop() m: number;
  @Prop() smM: number;
  @Prop() mdM: number;
  @Prop() lgM: number;
  @Prop() xlM: number;
  @Prop() my: number;
  @Prop() smMy: number;
  @Prop() mdMy: number;
  @Prop() lgMy: number;
  @Prop() xlMy: number;
  @Prop() mx: string;
  @Prop() smMx: string;
  @Prop() mdMx: string;
  @Prop() lgMx: string;
  @Prop() xlMx: string;
  @Prop() mt: number;
  @Prop() smMt: number;
  @Prop() mdMt: number;
  @Prop() lgMt: number;
  @Prop() xlMt: number;
  @Prop() mr: number;
  @Prop() smMr: number;
  @Prop() mdMr: number;
  @Prop() lgMr: number;
  @Prop() xlMr: number;
  @Prop() mb: number;
  @Prop() smMb: number;
  @Prop() mdMb: number;
  @Prop() lgMb: number;
  @Prop() xlMb: number;
  @Prop() ml: number;
  @Prop() smMl: number;
  @Prop() mdMl: number;
  @Prop() lgMl: number;
  @Prop() xlMl: number;
  @Prop() max: string;
  @Prop() smMax: string;
  @Prop() mdMax: string;
  @Prop() lgMax: string;
  @Prop() xlMax: string;
  @Prop() bg: string;
  @Prop() smBg: string;
  @Prop() mdBg: string;
  @Prop() lgBg: string;
  @Prop() xlBg: string;
  @Prop() hoverBg: string;
  @Prop() smHoverBg: string;
  @Prop() mdHoverBg: string;
  @Prop() lgHoverBg: string;
  @Prop() xlHoverBg: string;
  @Prop() hide: string;
  @Prop() smHide: boolean;
  @Prop() mdHide: boolean;
  @Prop() lgHide: boolean;
  @Prop() xlHide: boolean;
  @Prop() show: string;
  @Prop() smShow: boolean;
  @Prop() mdShow: boolean;
  @Prop() lgShow: boolean;
  @Prop() xlShow: boolean;
  @Prop() collapse: "collapse" | "separate";
  @Prop() bColor: string;
  @Prop() rounded: string;
  @Prop() roundedTop: string;
  @Prop() roundedRight: string;
  @Prop() roundedLeft: string;
  @Prop() roundedBottom: string;
  @Prop() bStyle: string;
  @Prop() bWidth: number;
  @Prop() bWidthTop: number;
  @Prop() bWidthRight: number;
  @Prop() bWidthBottom: number;
  @Prop() bWidthLeft: number;
  @Prop() animation: string;
  @Prop() shadow: string;
  @Prop() position: Position;
  @Prop() top: number;
  @Prop() right: number;
  @Prop() bottom: number;
  @Prop() left: number;

  async componentWillLoad() {
    await this.computeStyles();
  }

  async computeStyles() {
    return new Promise(async (res) => {
      const styleMap = (await import("../../utils/style")).generateStyleMap(this, "");
      const [hashCode, style] = computeStyle(styleMap);
      this.hash = hashCode;
      addStyleTagToHead(style, hashCode);
      res();
    });
  }

  _relevantProps = [
    "flex",
    "display",
    "smDisplay",
    "mdDisplay",
    "lgDisplay",
    "xlDisplay",
    "direction",
    "smDirection",
    "mdDirection",
    "lgDirection",
    "xlDirection",
    "items",
    "smItems",
    "mdItems",
    "lgIitems",
    "xlItems",
    "alignContent",
    "smAlignContent",
    "mdAlignContent",
    "lgAlignContent",
    "xlAlignContent",
    "self",
    "smSelf",
    "mdSelf",
    "lgSelf",
    "xlSelf",
    "justify",
    "smJustify",
    "mdJustify",
    "lgJustify",
    "xljustify",
    "wrap",
    "smWrap",
    "mdWrap",
    "lgWrap",
    "xlWrap",
    "flow",
    "smFlow",
    "mdFlow",
    "lgFlow",
    "xlFlow",
    "order",
    "smOrder",
    "mdOrder",
    "lgOrder",
    "xlOrder",
    "grow",
    "smGrow",
    "mdGrow",
    "lgGrow",
    "xlGrow",
    "shrink",
    "smShrink",
    "mdShrink",
    "lgShrink",
    "xlShrink",
    "basis",
    "smBasis",
    "mdBasis",
    "lgBasis",
    "xlBasis",
    "w",
    "smW",
    "mdW",
    "lgW",
    "xlW",
    "h",
    "smH",
    "mdH",
    "lgH",
    "xlH",
    "p",
    "lgP",
    "xlP",
    "smP",
    "mdP",
    "pLg",
    "pXl",
    "py",
    "smPy",
    "mdPy",
    "lgPy",
    "xlPy",
    "px",
    "smPx",
    "mdPx",
    "lgPx",
    "xlPx",
    "pt",
    "smPt",
    "mdPt",
    "lgPt",
    "xlPt",
    "pr",
    "smPr",
    "mdPr",
    "lgPr",
    "xlPr",
    "pb",
    "smPb",
    "mdPb",
    "lgPb",
    "xlPb",
    "pl",
    "smPl",
    "mdPl",
    "lgPl",
    "xlPl",
    "m",
    "smM",
    "mdM",
    "lgM",
    "xlM",
    "my",
    "smMy",
    "mdMy",
    "lgMy",
    "xlMy",
    "mx",
    "smMx",
    "mdMx",
    "lgMx",
    "xlMx",
    "mt",
    "smMt",
    "mdMt",
    "lgMt",
    "xlMt",
    "mr",
    "smMr",
    "mdMr",
    "lgMr",
    "xlMr",
    "mb",
    "smMb",
    "mdMb",
    "lgMb",
    "xlMb",
    "ml",
    "smMl",
    "mdMl",
    "lgMl",
    "xlMl",
    "max",
    "smMax",
    "mdMax",
    "lgMax",
    "xlMax",
    "bg",
    "smBg",
    "mdBg",
    "lgBg",
    "xlBg",
    "hoverBg",
    "smHoverBg",
    "mdHoverBg",
    "lgHoverBg",
    "xlHoverBg",
    "hide",
    "smHide",
    "mdHide",
    "lgHide",
    "xlHide",
    "show",
    "smShow",
    "mdShow",
    "lgShow",
    "xlShow",
    "collapse",
    "bColor",
    "rounded",
    "roundedTop",
    "roundedRight",
    "roundedLeft",
    "roundedBottom",
    "bStyle",
    "bWidth",
    "bWidthTop",
    "bWidthRight",
    "bWidthBottom",
    "bWidthLeft",
    "animation",
    "shadow",
    "position",
    "top",
    "right",
    "bottom",
    "left",
  ];

  @Prop({ reflect: false, mutable: true }) droppableElements = ["dershop-ui-box", "dershop-ui-grid"];

  render() {
    return (
      <Host class={this.hash}>
        <slot></slot>
      </Host>
    );
  }
}
