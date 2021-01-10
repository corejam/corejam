import { Component, Host, h } from "@stencil/core";
@Component({
  tag: "cj-route-login",
})
export class AuthLoginForm {
  render() {
    return (
      <Host>
        <corejam-auth-header />
        <corejam-auth-form-login />
      </Host>
    );
  }
}
