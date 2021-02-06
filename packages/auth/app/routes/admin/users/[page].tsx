import { Component, h, Host, Prop } from "@stencil/core";

@Component({
  tag: "cj-route-admin",
})
export class AdminUserList {
  @Prop() param: any;

  render() {
    return (
      <Host>
        <corejam-auth-header />
        <auth-admin-user-list page={this.param.page} />
      </Host>
    );
  }
}
