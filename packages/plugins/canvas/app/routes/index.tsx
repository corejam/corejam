import { Component, h, Host } from "@stencil/core";

@Component({
  tag: "route-index",
})
export class Hallo {
  render() {
    return (
      <Host>
        <corejam-canvas>
          <corejam-box flex p={24} items="baseline">
            <corejam-box p={8}>holla</corejam-box>
            <corejam-box p={8}>
              <corejam-box>inside</corejam-box>
              <corejam-box>inside</corejam-box>
              <corejam-box>inside</corejam-box>
            </corejam-box>
            <corejam-box p={8}>holla</corejam-box>
            <corejam-box p={8}>
              <corejam-type size="2xl">Hallo</corejam-type>
            </corejam-box>
          </corejam-box>
        </corejam-canvas>
      </Host>
    );
  }
}
