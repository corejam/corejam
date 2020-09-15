import { Component, Host, h, Prop } from "@stencil/core";

@Component({
  tag: "cj-route-admin",
  shadow: true,
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
