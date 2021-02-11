import { Component, Fragment, h } from "@stencil/core";

@Component({
  tag: "auth-layout",
})
export class AuthLayout {
  render() {
    return (
      <Fragment>
        <corejam-ui-base></corejam-ui-base>
        <auth-header></auth-header>
        <slot></slot>
      </Fragment>
    );
  }
}
