import { Component, h, Host } from "@stencil/core";
import { href } from "stencil-router-v2";

@Component({
  tag: "cj-route-bye",
  shadow: true,
})
export class Hallo {
  render() {
    return (
      <Host>
        <cj-pluginName></cj-pluginName>
        <a {...href("/hallo")}>Go to hallo</a>
      </Host>
    );
  }
}
