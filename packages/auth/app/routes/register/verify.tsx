import { Component, h, Host } from "@stencil/core";

@Component({
  tag: "auth-route-verify",
})
export class VerifyRoute {
  render() {
    return (
      <Host>
        <auth-verify />
      </Host>
    );
  }
}
