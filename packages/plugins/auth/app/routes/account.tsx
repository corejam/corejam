import { Component, Host, h } from "@stencil/core";

@Component({
  tag: "corejam-auth-route-account",
})
export class AccountRoute {
  render() {
    return (
      <Host>
        <corejam-auth-header />
        <corejam-auth-account></corejam-auth-account>
      </Host>
    );
  }
}
