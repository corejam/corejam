import { Component, h, Host, Prop } from "@stencil/core";

@Component({
  tag: "cj-route-admin-user-form",
})
export class AdminUserForm {
  @Prop() param: any;

  render() {
    console.log(this.param.id);
    return (
      <Host>
        <corejam-auth-header />
        <auth-admin-user-form formId={this.param.id} />
      </Host>
    );
  }
}
