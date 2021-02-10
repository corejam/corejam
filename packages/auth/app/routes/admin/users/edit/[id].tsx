import { Component, h, Host, Prop } from "@stencil/core";

@Component({
  tag: "auth-route-admin-user-form",
})
export class AdminUserForm {
  @Prop() param: any;

  render() {
    return (
      <Host>
        <auth-admin-user-form formId={this.param.id} />
      </Host>
    );
  }
}
