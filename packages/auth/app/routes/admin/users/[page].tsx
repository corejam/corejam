import { Component, h, Host, Prop } from "@stencil/core";

@Component({
  tag: "auth-route-admin",
})
export class AdminUserList {
  @Prop() param: any;

  render() {
    return (
      <Host>
        <auth-admin-user-list page={this.param.page} />
      </Host>
    );
  }
}
