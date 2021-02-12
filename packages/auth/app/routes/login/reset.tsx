import { Component, h, Host } from "@stencil/core";

@Component({
  tag: "auth-route-reset",
})
export class ResetRoute {
  render() {
    return (
      <Host>
        <auth-reset />
      </Host>
    );
  }
}
