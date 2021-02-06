import { Component, h, Host, Prop } from "@stencil/core";

@Component({
  tag: "corejam-tab",
})
export class CjTab {
  @Prop() header: string;
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
