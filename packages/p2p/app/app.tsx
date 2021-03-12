import { Component, Fragment, h } from "@stencil/core";

@Component({
  tag: "p2p-app",
})
export class P2PApp {
  render() {
    return (
      <Fragment>
        <corejam-app></corejam-app>
      </Fragment>
    );
  }
}
