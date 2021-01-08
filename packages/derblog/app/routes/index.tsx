import { Component, h, Host } from "@stencil/core";

@Component({
  tag: "derblog-route-index",
})
export class Index {
  render() {
    return (
      <Host>
        <derblog-list page={1}></derblog-list>
      </Host>
    );
  }
}
