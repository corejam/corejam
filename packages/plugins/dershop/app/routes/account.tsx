import { Component, Host, h } from "@stencil/core";

@Component({
  tag: "dershop-route-account",
})
export class AccountRoute {
  render() {
    return (
      <Host>
        <dershop-header></dershop-header>
        <dershop-account></dershop-account>
      </Host>
    );
  }
}
