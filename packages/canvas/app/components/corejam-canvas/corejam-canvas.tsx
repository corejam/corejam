import { Component, h } from "@stencil/core";

@Component({
  tag: "corejam-canvas",
})
export class CorejamCanvas {
  render() {
    return (
      <corejam-box w={12} h="100vh" class="drop" data-cy="drop" style={{ touchAction: "none", userSelect: "none" }}>
        <slot></slot>
      </corejam-box>
    );
  }
}
