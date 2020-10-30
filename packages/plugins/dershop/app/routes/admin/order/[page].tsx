import { Component, Host, h, Prop } from "@stencil/core";

@Component({
  tag: "dershop-route-admin-orders",
})
export class AdminOrderList {
  @Prop() param: any;

  render() {
    return (
      <Host>
        <dershop-admin-order-list page={this.param.page} />
      </Host>
    );
  }
}
