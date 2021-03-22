import { Component, h, Host, Prop } from "@stencil/core";

@Component({
  tag: "dershop-route-a-users",
})
export class AdminOrderList {
  @Prop() param: any;

  render() {
    return (
      <Host>
        <auth-admin-user-list page={1} />
      </Host>
    );
  }
}
