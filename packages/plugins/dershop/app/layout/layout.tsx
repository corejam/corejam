import { Component, Host, h } from "@stencil/core";

@Component({
  tag: "dershop-layout",
  shadow: true,
})
export class Layout {

  render() {
    return (
      <Host>
          <dershop-header></dershop-header>
          <slot></slot>
          <dershop-footer></dershop-footer>
      </Host>
    );
  }
}
