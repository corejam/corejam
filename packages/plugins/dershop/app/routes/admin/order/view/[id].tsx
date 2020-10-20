import { Component, Host, h, Prop } from "@stencil/core";

@Component({
  tag: "dershop-route-admin-order-view",
})
export class OrderViewRoute {
  @Prop() param: any;

  render() {
    return (
      <Host>
        <dershop-header />
        <dershop-order-view orderId={this.param.id} />
      </Host>
    );
  }
}
