import { Component, h, Host } from "@stencil/core";

@Component({
  tag: "route-index",
})
export class Hallo {
  render() {
    return (
      <Host>
        <corejam-box flex direction="col" items="center" p={6}>
          <corejam-box mb={4}>
            <corejam-type as="h2">Welcome to corejam</corejam-type>
          </corejam-box>
        </corejam-box>
      </Host>
    );
  }
}
