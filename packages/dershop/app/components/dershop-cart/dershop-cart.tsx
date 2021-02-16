import { runState } from "@corejam/run";
import { Component, ComponentInterface, h, Host } from "@stencil/core";
import { CheckoutStates } from "../../../shared/machines/basket";
import basket, { basketService } from "../../../shared/store/basket";

@Component({
  tag: "dershop-cart",
})
export class DershopCart implements ComponentInterface {
  private formId = "cart";

  render() {
    return (
      <Host>
        <corejam-box px={5}>
          <corejam-box max="xl" mx="auto" py={10} px={5} xlPx={0} direction="col">
            <corejam-type weight="bold" size="3xl" align="center">
              Cart
            </corejam-type>
          </corejam-box>
          {basketService.state.matches(CheckoutStates.IDLE) && (
            <corejam-box>
              <corejam-type as="h3" weight="black">
                No products in cart.
              </corejam-type>
              <corejam-type>Go ahead and search the shop.</corejam-type>
            </corejam-box>
          )}
          {!basketService.state.matches(CheckoutStates.IDLE) && (
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
                {basket.state.items.map((cartItem) => (
                  <dershop-cart-line item={cartItem}></dershop-cart-line>
                ))}
              </corejam-box>
              <corejam-box flex direction="col" md-direction="row" max="xl" mx="auto" px={2} xlPx={0}>
                <corejam-box w={12} md-w={9}></corejam-box>
                <corejam-box w={12} md-w={3} mt={8} direction="col">
                  <dershop-order-totals></dershop-order-totals>

                  <corejam-box flex justify="between">
                    <corejam-type
                      data-cy="checkout"
                      onClick={() => {
                        runState.router.push("/checkout");
                        basketService.send({ type: "NEXT_STEP" });
                      }}
                      weight="bold"
                      size="sm"
                    >
                      Checkout
                    </corejam-type>
                  </corejam-box>
                </corejam-box>
              </corejam-box>
            </corejam-form-container>
          )}
        </corejam-box>
      </Host>
    );
  }
}
