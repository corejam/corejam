import { Component, Fragment, h } from "@stencil/core";

@Component({
  tag: "canvas-app",
})
export class CanvasApp {
  render() {
    return (
      <Fragment>
        <corejam-ui-base></corejam-ui-base>
        <corejam-app></corejam-app>
      </Fragment>
    );
  }
}
