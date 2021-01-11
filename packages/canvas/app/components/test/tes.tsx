import { Component, Host, h } from "@stencil/core";

@Component({
  tag: "corejam-test",
})
export class CjTest {
  static getcha() {
    return "hi";
  }
  render() {
    return <Host>hi</Host>;
  }
}
