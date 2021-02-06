import { Component, h, Host, Prop } from "@stencil/core";

@Component({
  tag: "dershop-route-admin-order-view",
})
export class OrderViewRoute {
  @Prop() param: any;

  render() {
    return (
      <Host>
        <dershop-order-view orderId={this.param.id} />
      </Host>
    );
  }
}
