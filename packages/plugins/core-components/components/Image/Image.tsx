import { Component, h, Prop, Host, Element, Build, State, Watch } from "@stencil/core";
import { Style } from "../../shared/helpers/Style";
import { hashCode } from "../../shared/utils/utils";

@Component({
  tag: "corejam-image",
  shadow: true,
})
export class Image {
  @State() style: {};
  @State() computedStyle: string;
  @State() hash: string;
  @Element() el: HTMLElement;
  @Prop() src: string;
  @Prop() alt: string;
  @Prop() w: number = 12;
  @Prop() maxWidth: number = 100;
  @Prop() h: string;
  @Prop() fit: "cover";
  @Prop() rounded: "full";

  private observer: IntersectionObserver;

  componentDidLoad() {
    if (Build.isBrowser) this.setupObserver();
  }
  async componentWillLoad() {
    await this.computeStyles();
  }

  async computeStyles() {
    return new Promise(async (res) => {
      this.style = { ...this.style, flex: (await import("../../shared/utils/style")).generateStyleMap(this, "img") };
      res();
    });
  }

  @Watch("style")
  generateFinalStyleTags() {
    const computedStyle = Object.keys(this.style)
      .map((key) => this.style[key].join(" "))
      .join("");
    if (computedStyle.length > 0) {
      this.hash = "cj" + hashCode(computedStyle);
      this.computedStyle = `:host, .${this.hash} { ${computedStyle}}`;
    }
  }

  private setupObserver() {
    const img: HTMLImageElement = this.el.shadowRoot.querySelector("img");

    if (img) {
      this.observer = new IntersectionObserver(this.onIntersection);
      this.observer.observe(img);
    }
  }
  private onIntersection = async (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        if (this.observer) {
          this.observer.disconnect();
        }
        if (entry.target.getAttribute("data-src")) {
          entry.target.setAttribute("src", entry.target.getAttribute("data-src"));
          entry.target.removeAttribute("data-src");
        }
      }
    }
  };

  _relevantProps = ["w", "maxWidth", "h", "fit", "rounded"];

  render() {
    return (
      <Host as="image" alt={this.alt}>
        <img data-src={this.src} alt={this.alt} class={this.hash} />
        <Style hash={this.hash} styles={`:host {display: block;}\n${this.computedStyle}`} />
      </Host>
    );
  }
}
