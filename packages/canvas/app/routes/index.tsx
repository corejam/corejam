import { Component, h, Host } from "@stencil/core";

@Component({
  tag: "route-index",
})
export class Hallo {
  render() {
    return (
      <Host>
        <corejam-canvas></corejam-canvas>
      </Host>
    );
  }
}
