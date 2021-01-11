import { Component, Host, h } from "@stencil/core";

@Component({
  tag: "cj-route-index",
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
