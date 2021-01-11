import { Component, Host, h, Prop } from "@stencil/core";

@Component({
  tag: "corejam-tab",
})
export class CjTab {
  @Prop() header: string;
  @Prop() activeFn: Function;
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
