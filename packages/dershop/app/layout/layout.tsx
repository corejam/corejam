import { Component, h, Fragment } from "@stencil/core";

@Component({
  tag: "dershop-layout",
})
export class DerShopLayout {
  render() {
    return (
      <Fragment>
        <corejam-ui-base></corejam-ui-base>
        <dershop-header></dershop-header>
        <corejam-box min-h="calc(100vh - 156px)">
          <slot></slot>
        </corejam-box>
        <dershop-footer></dershop-footer>
      </Fragment>
    );
  }
}
