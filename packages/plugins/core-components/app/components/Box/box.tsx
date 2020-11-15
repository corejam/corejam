import { Component, Host, h, Prop, State, Watch } from "@stencil/core";
import { Flex, Position, Display } from "./types";

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
  @Prop() minH: string;
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
  @Prop() hide: boolean;
  @Prop() smHide: boolean;
  @Prop() mdHide: boolean;
  @Prop() lgHide: boolean;
  @Prop() xlHide: boolean;
  @Prop() show: string;
  @Prop() smShow: string;
  @Prop() mdShow: string;
  @Prop() lgShow: string;
  @Prop() xlShow: string;
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
  @Prop() z: number;

  async componentWillLoad() {
    await this.computeStyles();
  }

  @Watch("flex")
  @Watch("display")
  @Watch("smDisplay")
  @Watch("mdDisplay")
  @Watch("lgDisplay")
  @Watch("xlDisplay")
  @Watch("direction")
  @Watch("smDirection")
  @Watch("mdDirection")
  @Watch("lgDirection")
  @Watch("xlDirection")
  @Watch("items")
  @Watch("smItems")
  @Watch("mdItems")
  @Watch("lgIitems")
  @Watch("xlItems")
  @Watch("alignContent")
  @Watch("smAlignContent")
  @Watch("mdAlignContent")
  @Watch("lgAlignContent")
  @Watch("xlAlignContent")
  @Watch("self")
  @Watch("smSelf")
  @Watch("mdSelf")
  @Watch("lgSelf")
  @Watch("xlSelf")
  @Watch("justify")
  @Watch("smJustify")
  @Watch("mdJustify")
  @Watch("lgJustify")
  @Watch("xljustify")
  @Watch("wrap")
  @Watch("smWrap")
  @Watch("mdWrap")
  @Watch("lgWrap")
  @Watch("xlWrap")
  @Watch("flow")
  @Watch("smFlow")
  @Watch("mdFlow")
  @Watch("lgFlow")
  @Watch("xlFlow")
  @Watch("order")
  @Watch("smOrder")
  @Watch("mdOrder")
  @Watch("lgOrder")
  @Watch("xlOrder")
  @Watch("grow")
  @Watch("smGrow")
  @Watch("mdGrow")
  @Watch("lgGrow")
  @Watch("xlGrow")
  @Watch("shrink")
  @Watch("smShrink")
  @Watch("mdShrink")
  @Watch("lgShrink")
  @Watch("xlShrink")
  @Watch("basis")
  @Watch("smBasis")
  @Watch("mdBasis")
  @Watch("lgBasis")
  @Watch("xlBasis")
  @Watch("w")
  @Watch("smW")
  @Watch("mdW")
  @Watch("lgW")
  @Watch("xlW")
  @Watch("h")
  @Watch("smH")
  @Watch("mdH")
  @Watch("lgH")
  @Watch("xlH")
  @Watch("p")
  @Watch("smP")
  @Watch("mdP")
  @Watch("lgP")
  @Watch("xlP")
  @Watch("py")
  @Watch("smPy")
  @Watch("mdPy")
  @Watch("lgPy")
  @Watch("xlPy")
  @Watch("px")
  @Watch("smPx")
  @Watch("mdPx")
  @Watch("lgPx")
  @Watch("xlPx")
  @Watch("pt")
  @Watch("smPt")
  @Watch("mdPt")
  @Watch("lgPt")
  @Watch("xlPt")
  @Watch("pr")
  @Watch("smPr")
  @Watch("mdPr")
  @Watch("lgPr")
  @Watch("xlPr")
  @Watch("pb")
  @Watch("smPb")
  @Watch("mdPb")
  @Watch("lgPb")
  @Watch("xlPb")
  @Watch("pl")
  @Watch("smPl")
  @Watch("mdPl")
  @Watch("lgPl")
  @Watch("xlPl")
  @Watch("m")
  @Watch("smM")
  @Watch("mdM")
  @Watch("lgM")
  @Watch("xlM")
  @Watch("my")
  @Watch("smMy")
  @Watch("mdMy")
  @Watch("lgMy")
  @Watch("xlMy")
  @Watch("mx")
  @Watch("smMx")
  @Watch("mdMx")
  @Watch("lgMx")
  @Watch("xlMx")
  @Watch("mt")
  @Watch("smMt")
  @Watch("mdMt")
  @Watch("lgMt")
  @Watch("xlMt")
  @Watch("mr")
  @Watch("smMr")
  @Watch("mdMr")
  @Watch("lgMr")
  @Watch("xlMr")
  @Watch("mb")
  @Watch("smMb")
  @Watch("mdMb")
  @Watch("lgMb")
  @Watch("xlMb")
  @Watch("ml")
  @Watch("smMl")
  @Watch("mdMl")
  @Watch("lgMl")
  @Watch("xlMl")
  @Watch("max")
  @Watch("smMax")
  @Watch("mdMax")
  @Watch("lgMax")
  @Watch("xlMax")
  @Watch("bg")
  @Watch("smBg")
  @Watch("mdBg")
  @Watch("lgBg")
  @Watch("xlBg")
  @Watch("hoverBg")
  @Watch("smHoverBg")
  @Watch("mdHoverBg")
  @Watch("lgHoverBg")
  @Watch("xlHoverBg")
  @Watch("hide")
  @Watch("smHide")
  @Watch("mdHide")
  @Watch("lgHide")
  @Watch("xlHide")
  @Watch("show")
  @Watch("smShow")
  @Watch("mdShow")
  @Watch("lgShow")
  @Watch("xlShow")
  @Watch("collapse")
  @Watch("bColor")
  @Watch("rounded")
  @Watch("roundedTop")
  @Watch("roundedRight")
  @Watch("roundedLeft")
  @Watch("roundedBottom")
  @Watch("bStyle")
  @Watch("bWidth")
  @Watch("bWidthTop")
  @Watch("bWidthRight")
  @Watch("bWidthBottom")
  @Watch("bWidthLeft")
  @Watch("animation")
  @Watch("shadow")
  @Watch("position")
  @Watch("top")
  @Watch("right")
  @Watch("bottom")
  @Watch("left")
  async computeStyles() {
    const hash = await (await import("../../utils/style")).calculateStyles(this);
    this.hash = hash;
  }

  @Prop({ reflect: false, mutable: true }) droppableElements = ["dershop-ui-box", "dershop-ui-grid"];

  render() {
    return (
      <Host class={this.hash}>
        <slot></slot>
      </Host>
    );
  }
}
