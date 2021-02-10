import { Component, h, Host } from "@stencil/core";

@Component({
  tag: "auth-route-account",
})
export class AccountRoute {
  render() {
    return (
      <Host>
        <auth-account></auth-account>
      </Host>
    );
  }
}
