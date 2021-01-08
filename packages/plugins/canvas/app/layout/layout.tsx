import { Component, h, Fragment } from "@stencil/core";

@Component({
  tag: "canvas-layout",
})
export class CanvasLayout {
  render() {
    return (
      <Fragment>
        <corejam-ui-base></corejam-ui-base>
        <slot></slot>
        <corejam-menu></corejam-menu>
      </Fragment>
    );
  }
}
