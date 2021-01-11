import { Component, Host, h } from "@stencil/core";

@Component({
  tag: "cj-route-register",
})
export class AuthRegister {
  render() {
    return (
      <Host>
        <corejam-auth-header />
        <corejam-auth-form-register />
      </Host>
    );
  }
}
