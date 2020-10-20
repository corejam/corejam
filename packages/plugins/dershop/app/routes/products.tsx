import { Component, Host, h } from "@stencil/core";

@Component({
  tag: "dershop-route-products",
})
export class ProductRoute {
  render() {
    return (
      <Host>
        <dershop-product-list default></dershop-product-list>
      </Host>
    );
  }
}
