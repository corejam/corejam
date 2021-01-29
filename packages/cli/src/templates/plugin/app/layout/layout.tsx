import { Component, h } from "@stencil/core";

@Component({
  tag: "app-layout",
})
export class AppLayout {

  render() {
    return (
      <corejam-box>
        <slot></slot>
      </corejam-box>
    );
  }

}
