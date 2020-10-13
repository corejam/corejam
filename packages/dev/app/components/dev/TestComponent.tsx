import { Component, Host, h } from "@stencil/core";

@Component({
  tag: "app-test-comp",
})
export class AppTest {
  render() {
    return <Host>hi</Host>;
  }
}
