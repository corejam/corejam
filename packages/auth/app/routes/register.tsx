import { Component, h, Host } from "@stencil/core";

@Component({
  tag: "auth-route-register",
})
export class AuthRegister {
  render() {
    return (
      <Host>
        <auth-form-register />
      </Host>
    );
  }
}
