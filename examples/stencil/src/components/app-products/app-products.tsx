import { Component, h, Prop } from "@stencil/core";

@Component({
  tag: "app-products",
})
export class AppProducts {
  @Prop() page: number = 1;

  render() {
    return <dershop-product-list page={this.page}></dershop-product-list>;
  }
}
