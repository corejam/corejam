import { Component, ComponentInterface, h, Host } from "@stencil/core";
import basket from "../../../shared/store/basket";

@Component({
  tag: "dershop-cart-mini",
  styleUrl: "dershop-cart-mini.css",
})
export class DershopCartMini implements ComponentInterface {
  render() {
    return (
      <Host>
        <slot></slot>
        {basket.state.items.length > 0 && <span>{basket.state.items.length}</span>}
        <dershop-icons-cart />
      </Host>
    );
  }
}
