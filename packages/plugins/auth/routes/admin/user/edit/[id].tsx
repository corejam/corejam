import { Component, Host, h, Prop } from "@stencil/core";

@Component({
  tag: "cj-route-admin-user-form",
  shadow: true,
})
export class AdminUserForm {
  @Prop() param: any;

  render() {
    console.log(this.param.id);
    return (
      <Host>
        <corejam-auth-header />
        <auth-admin-user-form id={this.param.id} />
      </Host>
    );
  }
}
