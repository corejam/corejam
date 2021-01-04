import { Component, Host, h } from "@stencil/core";

@Component({
  tag: "dershop-route-account",
})
export class AccountRoute {
  render() {
    return (
      <Host>
        <dershop-account></dershop-account>
      </Host>
    );
  }
}
