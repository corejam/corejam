import { Component, h, Host, Prop } from "@stencil/core";

@Component({
  tag: "dershop-route-admin-users-edit",
})
export class AdminOrderList {
  @Prop() param: any;

  render() {
    return (
      <Host>
        <auth-admin-user-form formId={this.param.page} />
      </Host>
    );
  }
}
