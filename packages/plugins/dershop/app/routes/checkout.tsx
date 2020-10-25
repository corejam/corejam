import { coreState } from "@corejam/core-components";
import { state as routerState } from "@corejam/router";
import { Component, h, Host, Listen } from "@stencil/core";
import gql from "graphql-tag";
import { BasketStates } from "../../shared/machines/basket";
import { orderCreateGQL } from "../../shared/graphql/Mutations/Order";
import basket, { basketService, basketStore } from "../../shared/store/basket";
import { OrderCreateInput } from "../../shared/types/Order";

@Component({
    tag: "dershop-checkout",
})
export class CheckoutRoute {

    private orderConfirmFormId = "orderConfirm"
    private checkoutAddressFormId = "checkoutAddress"

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
        const request = await coreState.client.mutate({
            mutation: gql(orderCreateGQL),
            variables: {
                orderInput: input,
            },
        });

        if (request.data.orderCreate) {
            routerState.router.push(`/account/order/${request.data.orderCreate.id}`);
        }
    }

    renderStep() {
        switch (basketStore.state.value) {
            case BasketStates.ADDRESS:
                return (
                    <corejam-box w={12} pl={10} flex direction="row">
                        <corejam-box w={8}>
                            <corejam-box flex>
                                <corejam-box w={6} pr={4}>
                                    <corejam-form-input
                                        label="First name *"
                                        required
                                        name="firstName"
                                        formId={this.checkoutAddressFormId}
                                        value=""
                                        type="text"
                                        placeholder="Firstname"
                                    ></corejam-form-input>
                                </corejam-box>
                                <corejam-box w={6} pl={4}>
                                    <corejam-form-input
                                        name="lastName"
                                        required
                                        formId={this.checkoutAddressFormId}
                                        value=""
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
                                        value=""
                                        placeholder="Email"
                                    ></corejam-form-input>
                                </corejam-box>
                            </corejam-box>
                            <corejam-base-link data-cy="order-submit-address" onClick={() => {
                                basketService.send({ type: "ADDPAYMENT" });
                            }} href="#">
                                <corejam-type size="sm" weight="bold" transform="uppercase" decoration="underline">
                                    Next
                                </corejam-type>
                            </corejam-base-link>
                        </corejam-box>
                        <corejam-box w={4} px={10}>
                            <dershop-cart-overview></dershop-cart-overview>
                        </corejam-box>
                    </corejam-box>
                )
            case BasketStates.PAYMENT: return (
                <corejam-box flex direction="row">
                    <corejam-box w={8} pl={10} flex direction="col">
                        <corejam-box w={12} py={5}>
                            <corejam-type size="2xl" weight="bold">Payment Method</corejam-type>
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
                            <corejam-base-link data-cy="order-submit-payment" onClick={() => {
                                basketService.send({ type: "CONFIRM" });
                            }} href="#">
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
            )
            case BasketStates.CONFIRMATION: return (
                <corejam-box px={5}>
                    <corejam-box>
                        <corejam-box justify="evenly" flex direction="row">
                            <corejam-box bg="gray-200" p={5}>
                                <corejam-box>
                                    <corejam-type weight="bold">
                                        Shipping Address
                                    </corejam-type>
                                </corejam-box>
                                <corejam-box>
                                </corejam-box>
                            </corejam-box>
                            <corejam-box bg="gray-200" p={5}>
                                <corejam-type weight="bold">
                                    Billing Address
                                </corejam-type>
                            </corejam-box>
                            <corejam-box bg="gray-200" p={5}>
                                <corejam-type weight="bold">
                                    Payment Method
                                </corejam-type>
                            </corejam-box>
                        </corejam-box>
                    </corejam-box>
                    <corejam-box w={12}>
                        <corejam-form-container name={this.orderConfirmFormId}>
                            {basket.state.items.map((cartItem) => <dershop-cart-line item={cartItem}></dershop-cart-line>)}
                            <corejam-form-submit formId={this.orderConfirmFormId}>
                                <corejam-box flex direction="row" justify="center" >
                                    <corejam-box w={5}>
                                        <dershop-order-totals></dershop-order-totals>
                                        <corejam-box>
                                            <button data-cy="buy-now" type="submit">
                                                Confirm Order
                                            </button>
                                        </corejam-box>
                                    </corejam-box>
                                </corejam-box>
                            </corejam-form-submit>
                        </corejam-form-container>
                    </corejam-box>
                </corejam-box>
            )
        }
    }

    render() {
        return (
            <Host>
                <corejam-box max="xl" mx="auto" px={4} lgPx={0}>
                    <corejam-box max="xl" mx="auto" py={10} px={5} xlPx={0} direction="col">
                        <corejam-type weight="bold" size="3xl" align="center">
                            Checkout
                        </corejam-type>
                        <corejam-box mt={10} flex direction="row">
                            <corejam-box w={6} bg="gray-800" h="16px"></corejam-box>
                            <corejam-box w={6} h="16px" bg="gray-400"></corejam-box>
                        </corejam-box>
                    </corejam-box>
                    {this.renderStep()}
                </corejam-box>
            </Host>
        );
    }
}
