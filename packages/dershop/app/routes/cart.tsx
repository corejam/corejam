import { Component, h, Host } from "@stencil/core";

@Component({
  tag: "dershop-route-cart",
})
export class CartRoute {
  render() {
    return (
      <Host>
        <dershop-cart />
      </Host>
    );
  }
}
