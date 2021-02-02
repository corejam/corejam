import { Component, h } from "@stencil/core";

@Component({
  tag: "corejam-canvas",
})
export class CorejamCanvas {
  render() {
    return (
      <corejam-box class="drop" data-cy="drop">
        <slot></slot>
      </corejam-box>
    );
  }
}
