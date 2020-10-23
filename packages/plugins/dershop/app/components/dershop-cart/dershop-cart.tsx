import { state as routerState } from "@corejam/router";
import { Component, ComponentInterface, h, Host } from "@stencil/core";
import basket, { basketService } from "../../../shared/store/basket";

@Component({
  tag: "dershop-cart",
})
export class DershopCart implements ComponentInterface {
  private formId = "cart";

  render() {
    return (
      <Host>
        <corejam-box max="xl" mx="auto" py={10} px={5} xlPx={0} direction="col">
          <corejam-type weight="bold" size="3xl" align="center">
            Cart
          </corejam-type>
        </corejam-box>
        <corejam-form-container name={this.formId}>
          <corejam-box max="xl" mx="auto" px={2} xlPx={0} direction="col">
            <corejam-box flex justify="between" w={12} py={4} bWidthBottom={1} bWidthTop={1} bColor="gray-300">
              <corejam-box w={5}>
                <corejam-type size="sm">Product</corejam-type>
              </corejam-box>
              <corejam-box>
                <corejam-type size="sm">Price</corejam-type>
              </corejam-box>
              <corejam-box>
                <corejam-type size="sm">Quantity</corejam-type>
              </corejam-box>
              <corejam-box>
                <corejam-type>Total</corejam-type>
              </corejam-box>
            </corejam-box>
            {basket.state.items.map((cartItem) => <dershop-cart-line item={cartItem}></dershop-cart-line> )}
          </corejam-box>
          <corejam-box flex direction="col" md-direction="row" max="xl" mx="auto" px={2} xlPx={0}>
            <corejam-box w={12} md-w={9}></corejam-box>
            <corejam-box w={12} md-w={3} mt={8} direction="col">
              <corejam-box bWidthBottom={1} bColor="gray-300" mb={6} py={4}>
                <corejam-type>Cart totals</corejam-type>
              </corejam-box>
              <corejam-box flex justify="between" mb={4}>
                <corejam-type>Cart subtotal</corejam-type>
                <corejam-type weight="bold">{basket.state.subTotal} €</corejam-type>
              </corejam-box>
              <corejam-box flex justify="between" mb={4}>
                <corejam-type>Shipping</corejam-type>
                <corejam-type weight="bold">{basket.state.shipping} €</corejam-type>
              </corejam-box>
              <corejam-box bWidthBottom={1} py={4} bColor="gray-300" flex justify="between" mb={4}>
                <corejam-type>Order Total</corejam-type>
                <corejam-type weight="bold">{basket.state.orderTotal} €</corejam-type>
              </corejam-box>
              <corejam-box flex justify="between">
                <corejam-base-link onClick={() => {
                  basketService.send({ type: "ADD_ADDRESS" });
                  routerState.router.push("/checkout")
                }}>
                  <corejam-type weight="bold" size="sm">
                    Checkout
                  </corejam-type>
                </corejam-base-link>
              </corejam-box>
            </corejam-box>
          </corejam-box>
        </corejam-form-container>
      </Host>
    );
  }
}
