import { Component, h, Host } from "@stencil/core";

@Component({
  tag: "dershop-route-login",
})
export class LoginRoute {
  render() {
    return (
      <Host>
        <auth-form-login></auth-form-login>
      </Host>
    );
  }
}
