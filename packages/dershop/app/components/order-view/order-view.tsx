import { coreState } from "@corejam/core-components";
import { authStore } from "@corejam/plugin-auth";
import { Component, h, Host, Prop, State, Watch } from "@stencil/core";
import gql from "graphql-tag";
import { orderById } from "../../../shared/graphql/Queries/Order";
import { OrderDB } from "../../../shared/types/Order";

@Component({
  tag: "dershop-order-view",
})
export class OrderView {
  @Prop() orderId: string;
  @State() _data: OrderDB;

  @Watch("orderId")
  rerenderForId() {
    this.queryData();
  }

  async queryData() {
    const request = await coreState.client.query({
      query: gql(orderById),
      variables: {
        id: this.orderId,
      },
    });

    this._data = request.data.orderById;
  }

  async componentWillRender() {
    if (authStore.identity) await this.queryData();
  }

  render() {
    if (!authStore.identity) return <corejam-box mx="auto">Not authorized</corejam-box>;

    return (
      <Host>
        <corejam-box max="xl" flex direction="col" mx="auto">
          <corejam-box max="xl">
            <corejam-type as="h2" size="xl">
              Order Info - {this._data.id}
            </corejam-type>
          </corejam-box>
          <corejam-box flex justify="between" pb={2} bWidthBottom={1} bColor="gray-300">
            <corejam-box w={5}>
              <dershop-ui-type size="sm">Product</dershop-ui-type>
            </corejam-box>
            <corejam-box>
              <dershop-ui-type size="sm">Price</dershop-ui-type>
            </corejam-box>
            <corejam-box>
              <dershop-ui-type size="sm">Quantity</dershop-ui-type>
            </corejam-box>
            <corejam-box>
              <dershop-ui-type>Total</dershop-ui-type>
            </corejam-box>
          </corejam-box>
          {this._data.items.map((item) => (
            <corejam-box py={2} justify="between" flex direction="row">
              <corejam-box flex w={5} items="center">
                <dershop-ui-type weight="bold">{item.product.name}</dershop-ui-type>
              </corejam-box>
              <corejam-box>
                <dershop-ui-type size="sm">{item.price.net}€</dershop-ui-type>
              </corejam-box>
              <corejam-box>
                <dershop-ui-type size="sm">{item.quantity}</dershop-ui-type>
              </corejam-box>
              <corejam-box>
                <dershop-ui-type size="sm">{item.price.net * item.quantity}€</dershop-ui-type>
              </corejam-box>
            </corejam-box>
          ))}
        </corejam-box>
        <corejam-box mt={20} flex direction="row">
          <corejam-box max="xl" flex direction="col" mx="auto">
            <corejam-type as="h2" size="xl">
              Order Status
            </corejam-type>
            {this._data.status}
          </corejam-box>
          <corejam-box max="xl" flex direction="col" mx="auto">
            <corejam-type as="h2" size="xl">
              Shipping Address
            </corejam-type>
            {this._data.user.firstName} - {this._data.user.lastName} <br />
            {this._data.addressShipping.city} - {this._data.addressShipping.country}
          </corejam-box>
          <corejam-box max="xl" flex direction="col" mx="auto">
            <corejam-type as="h2" size="xl">
              Billing Address
            </corejam-type>
            {this._data.addressBilling.city} - {this._data.addressBilling.country}
          </corejam-box>
          <corejam-box flex max="xl" mx="auto" px={2} xlPx={0}>
            <corejam-box w={3} mt={8}>
              <corejam-box flex justify="between" mb={4}>
                <dershop-ui-type>Order Total</dershop-ui-type>
                <dershop-ui-type weight="bold">{this._data.price.net} €</dershop-ui-type>
              </corejam-box>
            </corejam-box>
          </corejam-box>
        </corejam-box>
      </Host>
    );
  }
}
