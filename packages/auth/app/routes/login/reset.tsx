import { Component, h, Host } from "@stencil/core";

@Component({
  tag: "corejam-auth-route-reset",
})
export class ResetRoute {
  render() {
    return (
      <Host>
        <corejam-auth-header />
        <corejam-auth-reset />
      </Host>
    );
  }
}
