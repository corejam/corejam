import { Component, Fragment, h } from "@stencil/core";

@Component({
  tag: "dershop-app",
})
export class DerShopLayout {
  render() {
    return (
      <Fragment>
        <corejam-ui-base></corejam-ui-base>
        <dershop-header></dershop-header>
        <corejam-box min-h="calc(100vh - 156px)">
          <corejam-app></corejam-app>
        </corejam-box>
        <dershop-footer></dershop-footer>
      </Fragment>
    );
  }
}
