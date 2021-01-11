import { Component, h, Prop, Host, Element, Build, State } from "@stencil/core";

@Component({
  tag: "corejam-image",
})
export class Image {
  @State() hash: string;
  @Element() el: HTMLElement;
  @Prop({ reflect: true }) src: string;
  @Prop({ reflect: true }) alt: string;
  @Prop({ reflect: true }) w = 12;
  @Prop({ reflect: true }) maxWidth = 100;
  @Prop({ reflect: true }) h: string;
  @Prop({ reflect: true }) maxH: string;
  @Prop({ reflect: true }) fit: "cover";
  @Prop({ reflect: true }) rounded: "full";
  @Prop({ reflect: true }) lazy = false;

  private observer: IntersectionObserver;

  componentDidLoad() {
    if (Build.isBrowser && this.lazy) this.setupObserver();
  }
  async componentWillLoad() {
    await this.computeStyles();
  }

  async computeStyles() {
    const hash = await (await import("../../utils/style")).calculateStyles(this);
    this.hash = hash;
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
