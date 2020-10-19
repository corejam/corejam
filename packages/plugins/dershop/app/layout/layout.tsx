import { Component, h, Fragment } from "@stencil/core";

@Component({
  tag: "dershop-layout",
})
export class DerShopLayout {
  render() {
    return (
      <Fragment>
        <dershop-header />
        <slot />
        <dershop-footer />
      </Fragment>
    );
  }
}
