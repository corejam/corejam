import { Component, ComponentInterface, h, Host, Listen } from "@stencil/core";
import basket from "../../shared/store/basket";
import { orderCreateGQL } from "../../shared/graphql/Mutations/Order";
import { OrderCreateInput } from "../../shared/types/Order";
import { routerState, coreState } from "@corejam/core-components";
@Component({
  tag: "dershop-cart",
  shadow: true,
})
export class DershopCart implements ComponentInterface {
  private formId = "cart";

  @Listen("sendForm", { target: "window" })
  async formEventHandler() {
    const testAddress = {
      street: "street",
      street_2: "street 2 ",
      city: "City",
      state: "State",
      country: "Germany",
      zipCode: "zip",
    };

    const input: OrderCreateInput = {
      items: [
        {
          product: {
            id: basket.state.items[0].id,
            name: basket.state.items[0].name,
          },
          price: {
            gross: basket.state.items[0].price.gross,
            tax_rate: 19,
            net: basket.state.items[0].price.gross,
          },
          quantity: basket.state.items[0].quantity,
        },
      ],
      status: "SHIPPING",
      addressBilling: {
        ...testAddress,
      },
      addressShipping: {
        ...testAddress,
      },
      price: {
        gross: 19.99,
        tax_rate: 19,
        net: 15.0,
      },
    };

    //TODO move this to the order confirmation page.
    const request = await coreState.client.request(orderCreateGQL, {
      orderInput: input,
    });

    if (request.orderCreate) {
      routerState.router.push(`/account/order/${request.orderCreate.id}`);
    }
  }

  render() {
    return (
      <Host>
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
              <corejam-box
                class="cartItem"
                flex
                justify="between"
                py={5}
                bWidthBottom={1}
                bColor="gray-300"
                items="center"
                animation="fade"
              >
                <corejam-box flex w={5} items="center">
                  <corejam-box flex w={2} mr={4}>
                    <corejam-image fit="cover" src={cartItem.images[0].src} alt=""></corejam-image>
                  </corejam-box>
                  <corejam-base-link href={`/${cartItem.seo.url}`}>
                    <corejam-type data-cy="cartItemName" weight="bold">{cartItem.name}</corejam-type>
                  </corejam-base-link>
                </corejam-box>
                <corejam-box>
                  <corejam-type size="sm">{cartItem.price.net}€</corejam-type>
                </corejam-box>
                <corejam-box>
                  <corejam-type size="sm">{cartItem.quantity}</corejam-type>
                </corejam-box>
                <corejam-box>
                  <corejam-type size="sm">{cartItem.price.net * cartItem.quantity}€</corejam-type>
                </corejam-box>
              </corejam-box>
            ))}
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
              <corejam-box flex justify="between" mb={4}>
                <corejam-type>Order Total</corejam-type>
                <corejam-type weight="bold">{basket.state.orderTotal} €</corejam-type>
              </corejam-box>
              <corejam-box flex justify="between">
                <corejam-base-link href="/checkout">
                  <corejam-type weight="bold" size="sm">
                    Checkout
                  </corejam-type>
                </corejam-base-link>
                <corejam-form-submit formId={this.formId}>
                  <button data-cy="buy-now" type="submit">Buy Now</button>
                </corejam-form-submit>
              </corejam-box>
            </corejam-box>
          </corejam-box>
        </corejam-form-container>
      </Host>
    );
  }
}
