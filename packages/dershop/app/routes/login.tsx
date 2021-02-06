import { Component, h, Host } from "@stencil/core";

@Component({
  tag: "dershop-route-login",
})
export class LoginRoute {
  render() {
    return (
      <Host>
        <corejam-auth-form-login></corejam-auth-form-login>
      </Host>
    );
  }
}
