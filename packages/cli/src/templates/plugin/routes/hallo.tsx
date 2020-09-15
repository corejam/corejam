import { Component, h, Host } from "@stencil/core";
import { href } from "stencil-router-v2";

@Component({
  tag: "cj-route-hallo",
  shadow: true,
})
export class Hallo {
  render() {
    return (
      <Host>
        <a {...href("/bye")}>Go to bye</a>
      </Host>
    );
  }
}
