import { Component, h, Host, Prop, State, Watch } from "@stencil/core";
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
  @Prop({ reflect: true }) w: string | number;
  @Prop({ reflect: true }) smW: string | number;
  @Prop({ reflect: true }) mdW: string | number;
  @Prop({ reflect: true }) lgW: string | number;
  @Prop({ reflect: true }) xlW: string | number;
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
  @Prop({ reflect: true }) droppableElements = ["corejam-box"];

  componentShouldUpdate(newValue, oldValue) {
    return newValue != oldValue;
  }

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
  @Watch("hoverShadow")
  @Watch("position")
  @Watch("top")
  @Watch("right")
  @Watch("bottom")
  @Watch("left")
  async computeStyles() {
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
