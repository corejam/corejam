import { coreState } from "@corejam/core-components";
import { authStore } from "@corejam/plugin-auth";
import { Component, h, Host, State } from "@stencil/core";
import gql from "graphql-tag";
import { meGQL } from "../../shared/graphql/Mutations/User";
import { CheckoutStates } from "../../shared/machines/basket";
import basket, { basketService, basketStore } from "../../shared/store/basket";
import { UserDB } from "../../shared/types/User";

const Layout = (_props, children) => {
  return (
    <corejam-box max="xl" mx="auto" px={4} lgPx={0}>
      <corejam-box max="xl" mx="auto" py={10} px={5} xlPx={0} direction="col">
        <corejam-type weight="bold" size="3xl" align="center" color="gray-700">
          Checkout
        </corejam-type>
        <corejam-box mt={10} flex direction="row">
          <corejam-box w={6} bg="gray-800" h="8px"></corejam-box>
          <corejam-box w={6} h="8px" bg="gray-400"></corejam-box>
        </corejam-box>
      </corejam-box>
      {children}
    </corejam-box>
  );
};

@Component({
  tag: "dershop-checkout",
})
export class CheckoutRoute {
  private orderConfirmFormId = "orderConfirm";
  private checkoutAddressFormId = "checkoutAddress";

  @State() me: UserDB;

  submitOrder() {
    basketService.send({ type: "CONFIRM" });
  }

  authenticateSuccess() {
    basketService.send({ type: "NEXT_STEP" });
  }

  async componentWillRender() {
    if (authStore.identity) {
      const request = await coreState.client.mutate({
        mutation: gql(meGQL),
      });
      this.me = request.data.me;
    }
  }

  addressSubmitHandler(data) {
    basketService.send({ type: "NEXT_STEP", data });
  }

  renderStep() {
    switch (basketStore.state.value) {
      case CheckoutStates.LOGIN_OR_REGISTER: {
        return (
          <corejam-box max="xl" mx="auto" flex w={12} px={4} pt={8}>
            <corejam-box w={6}>
              <corejam-type as="h3">Log in</corejam-type>
              <corejam-auth-form-login onSuccess={this.authenticateSuccess}></corejam-auth-form-login>
            </corejam-box>
            <corejam-box w={6}>
              <corejam-type as="h3">Register</corejam-type>
              <corejam-auth-form-register></corejam-auth-form-register>
            </corejam-box>
          </corejam-box>
        );
      }
      case CheckoutStates.ADDRESS:
        return (
          <Layout>
            <corejam-box w={12} pl={10} flex direction="row">
              <corejam-box w={8}>
                <corejam-form-container submitHandler={this.addressSubmitHandler} name={this.checkoutAddressFormId}>
                  <corejam-box flex>
                    <corejam-box w={6} pr={4}>
                      <corejam-form-input
                        label="First name *"
                        required
                        name="firstName"
                        formId={this.checkoutAddressFormId}
                        value={this.me?.firstName}
                        type="text"
                        placeholder="Firstname"
                      ></corejam-form-input>
                    </corejam-box>
                    <corejam-box w={6} pl={4}>
                      <corejam-form-input
                        name="lastName"
                        required
                        formId={this.checkoutAddressFormId}
                        value={this.me?.lastName}
                        type="text"
                        placeholder="Lastname"
                        label="Last name"
                      ></corejam-form-input>
                    </corejam-box>
                  </corejam-box>
                  <corejam-box w={12}>
                    <corejam-form-input
                      name="address"
                      type="text"
                      formId={this.checkoutAddressFormId}
                      label="Address"
                      placeholder="Address"
                    ></corejam-form-input>
                  </corejam-box>
                  <corejam-box flex>
                    <corejam-box w={6} pr={4}>
                      <corejam-form-input
                        name="zipCode"
                        type="text"
                        formId={this.checkoutAddressFormId}
                        label="Zip Code"
                        placeholder="Zip Code"
                      ></corejam-form-input>
                    </corejam-box>
                    <corejam-box w={6} pl={4}>
                      <corejam-form-input
                        name="country"
                        type="text"
                        formId={this.checkoutAddressFormId}
                        required
                        label="Country"
                        value=""
                        placeholder="Country"
                      ></corejam-form-input>
                    </corejam-box>
                  </corejam-box>
                  <corejam-box flex mb={8}>
                    <corejam-box w={6} pr={4}>
                      <corejam-form-input
                        name="phoneNumber"
                        type="number"
                        formId={this.checkoutAddressFormId}
                        label="Phone number"
                        placeholder="Phone"
                      ></corejam-form-input>
                    </corejam-box>
                    <corejam-box w={6} pl={4}>
                      <corejam-form-input
                        name="email"
                        type="email"
                        formId={this.checkoutAddressFormId}
                        required
                        label="Email Address"
                        value={this.me?.email}
                        placeholder="Email"
                      ></corejam-form-input>
                    </corejam-box>
                  </corejam-box>
                  <corejam-form-submit formId={this.checkoutAddressFormId}>
                    <corejam-type size="sm" weight="bold" transform="uppercase" decoration="underline">
                      Next
                    </corejam-type>
                  </corejam-form-submit>
                </corejam-form-container>
              </corejam-box>
              <corejam-box w={4} px={10}>
                <dershop-cart-overview></dershop-cart-overview>
              </corejam-box>
            </corejam-box>
          </Layout>
        );
      case CheckoutStates.PAYMENT:
        return (
          <Layout>
            <corejam-box flex w={12} direction="row">
              <corejam-box w={8} pl={10} flex direction="col">
                <corejam-box w={12} py={5}>
                  <corejam-type size="2xl" weight="bold">
                    Payment Method
                  </corejam-type>
                </corejam-box>
                <corejam-box py={5} bWidthTop={1} bWidthBottom={1} bColor="gray-400">
                  <corejam-type size="lg">
                    <input type="radio"></input> Bank Transfer Payment
                  </corejam-type>
                </corejam-box>
                <corejam-box py={5} bWidthTop={1} bWidthBottom={1} bColor="gray-400">
                  <corejam-type size="lg">
                    <input type="radio"></input> Cash on Deliver
                  </corejam-type>
                </corejam-box>
                <corejam-box py={5} bWidthTop={1} bWidthBottom={1} bColor="gray-400">
                  <corejam-type size="lg">
                    <input type="radio"></input> Purchase Order
                  </corejam-type>
                </corejam-box>
                <corejam-box mt={10}>
                  <corejam-base-link
                    data-cy="order-submit-payment"
                    onClick={() => {
                      basketService.send({ type: "NEXT_STEP" });
                    }}
                    href="#"
                  >
                    <corejam-type size="sm" weight="bold" transform="uppercase" decoration="underline">
                      Next
                    </corejam-type>
                  </corejam-base-link>
                </corejam-box>
              </corejam-box>
              <corejam-box w={4} px={10}>
                <dershop-cart-overview></dershop-cart-overview>
              </corejam-box>
            </corejam-box>
          </Layout>
        );
      case CheckoutStates.OVERVIEW:
        return (
          <Layout>
            {basketStore.state.state.errors && (
              <corejam-box bg="red-200" p={8}>
                {basketStore.state.state.errors.networkError.result.errors.map((error) => {
                  return <corejam-box pb={4}>{error.message}</corejam-box>;
                })}
              </corejam-box>
            )}
            <corejam-box px={5}>
              <corejam-box>
                <corejam-box justify="evenly" flex direction="row">
                  <corejam-box bg="gray-200" p={5}>
                    <corejam-box>
                      <corejam-type weight="bold">Shipping Address</corejam-type>
                    </corejam-box>
                    <corejam-box></corejam-box>
                  </corejam-box>
                  <corejam-box bg="gray-200" p={5}>
                    <corejam-type weight="bold">Billing Address</corejam-type>
                  </corejam-box>
                  <corejam-box bg="gray-200" p={5}>
                    <corejam-type weight="bold">Payment Method</corejam-type>
                  </corejam-box>
                </corejam-box>
              </corejam-box>
              <corejam-box w={12}>
                <corejam-form-container submitHandler={this.submitOrder} name={this.orderConfirmFormId}>
                  {basket.state.items.map((cartItem) => (
                    <dershop-cart-line item={cartItem}></dershop-cart-line>
                  ))}
                  <corejam-form-submit formId={this.orderConfirmFormId}>
                    <corejam-box flex direction="row" justify="center">
                      <corejam-box w={5}>
                        <dershop-order-totals></dershop-order-totals>
                        <corejam-box>
                          <corejam-form-submit formId={this.orderConfirmFormId} data-cy="buy-now">
                            Confirm Order
                          </corejam-form-submit>
                        </corejam-box>
                      </corejam-box>
                    </corejam-box>
                  </corejam-form-submit>
                </corejam-form-container>
              </corejam-box>
            </corejam-box>
          </Layout>
        );
    }
  }

  render() {
    return <Host>{this.renderStep()}</Host>;
  }
}
