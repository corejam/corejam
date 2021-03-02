import { Component, h, Host } from "@stencil/core";

@Component({
  tag: "dershop-route-thankyou",
})
export class CartRoute {
  render() {
    return (
      <Host>
        <corejam-box max="lg" mx="auto" w="6" pt={12}>
          <corejam-type as="h1">Thank your for your order</corejam-type>
        </corejam-box>
      </Host>
    );
  }
}
