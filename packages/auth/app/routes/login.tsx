import { Component, h, Host } from "@stencil/core";
@Component({
  tag: "auth-route-login",
})
export class AuthLoginForm {
  render() {
    return (
      <Host>
        <auth-form-login />
      </Host>
    );
  }
}
