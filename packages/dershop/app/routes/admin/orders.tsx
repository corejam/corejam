import { Component, h, Host, Prop } from "@stencil/core";

@Component({
  tag: "dershop-route-a-orders",
})
export class AdminOrderList {
  @Prop() param: any;

  render() {
    return (
      <Host>
        <dershop-admin-order-list page={1} />
      </Host>
    );
  }
}
