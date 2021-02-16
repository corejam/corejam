import { Component, h, Host, Prop } from "@stencil/core";

@Component({
  tag: "dershop-route-account-order",
})
export class AccountOrderRoute {
  @Prop() param: any;

  render() {
    return (
      <Host>
        <dershop-order-view orderId={this.param.id}></dershop-order-view>
      </Host>
    );
  }
}
