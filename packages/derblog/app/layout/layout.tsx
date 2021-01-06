import { Component, h, Host } from "@stencil/core";

@Component({
  tag: "derblog-layout",
})
export class DerBlogLayout {

  render() {
    return (
      <Host>
        <corejam-ui-base></corejam-ui-base>
        <derblog-header></derblog-header>
        <corejam-box min-h="calc(100vh - 190px)">
          <slot></slot>
        </corejam-box>
        <derblog-footer></derblog-footer>
      </Host>
    );
  }
}
