import { Component, h, Prop, Host, Element, Build, State } from "@stencil/core";
import { computeStyle } from "../../utils/computeStyle";
import { addStyleTagToHead } from "../../utils/addStyleTag";

@Component({
  tag: "corejam-image",
})
export class Image {
  @State() hash: string;
  @Element() el: HTMLElement;
  @Prop() src: string;
  @Prop() alt: string;
  @Prop() w = 12;
  @Prop() maxWidth = 100;
  @Prop() h: string;
  @Prop() maxH: string;
  @Prop() fit: "cover";
  @Prop() rounded: "full";
  @Prop() lazy = false;

  private observer: IntersectionObserver;

  componentDidLoad() {
    if (Build.isBrowser && this.lazy) this.setupObserver();
  }
  async componentWillLoad() {
    await this.computeStyles();
  }

  async computeStyles() {
    return new Promise(async (res) => {
      const styleMap = (await import("../../utils/style")).generateStyleMap(this, "img");
      const [hashCode, style] = computeStyle(styleMap);
      this.hash = hashCode;
      addStyleTagToHead(style, hashCode);
      res();
    });
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

  _relevantProps = ["w", "maxWidth", "h", "maxH", "fit", "rounded"];

  render() {
    const srcProps = {};
    this.lazy ? (srcProps["data-src"] = this.src) : (srcProps["src"] = this.src);
    return (
      <Host as="image" alt={this.alt}>
        <img {...srcProps} alt={this.alt} class={this.hash} />
      </Host>
    );
  }
}
