import { Component, Host, h } from "@stencil/core";

@Component({
  tag: "cj-route-index",
  shadow: true,
})
export class AuthLoginForm {
  render() {
    return (
      <Host>
        <corejam-auth-header />
      </Host>
    );
  }
}
