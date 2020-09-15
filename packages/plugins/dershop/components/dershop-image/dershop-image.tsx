import { Component, h, Prop, Host, Element } from "@stencil/core";

export type objectFit =
  | "contain"
  | "cover"
  | "fill"
  | "none"
  | "scale-down"
  | "bottom"
  | "center"
  | "left"
  | "left-bottom"
  | "left-top"
  | "right"
  | "right-bottom"
  | "right-top"
  | "top";

@Component({
  tag: "dershop-image",
  styleUrl: "dershop-image.css",
  shadow: true,
})
export class DershopImage {
  @Element() el: HTMLElement;
  @Prop() src: string;
  @Prop() alt: string;
  @Prop() fit: objectFit;
  @Prop() h: string;

  render() {
    return (
      <Host>
        <img src={this.src} alt={this.alt} />
      </Host>
    );
  }
}
