import { Component, Host, h } from "@stencil/core";
@Component({
  tag: "cj-route-login",
  shadow: true,
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
