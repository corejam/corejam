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
                    <div>
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
                                    name="phoneNumber"
                                    type="text"
                                    formId={this.checkoutAddressFormId}
                                    label="Zip Code"
                                    placeholder="Zip Code"
                                ></corejam-form-input>
                            </corejam-box>
                            <corejam-box w={6} pl={4}>
                                <corejam-form-input
                                    name="email"
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
                        <corejam-base-link onClick={() => {
                            basketService.send({ type: "ADDPAYMENT" });
                        }} href="#">
                            <corejam-type size="sm" weight="bold" transform="uppercase" decoration="underline">
                                Next
                                </corejam-type>
                        </corejam-base-link>
                    </div >
                )
            case BasketStates.PAYMENT: return (
                <corejam-box w={8} pr={4} flex direction="col">
                    <corejam-box w={12} mb={5}>
                        <corejam-type size="lg" weight="bold">Payment Method</corejam-type>
                    </corejam-box>
                    <corejam-box>
                        <corejam-type size="lg">
                            Bank Transfer
                        </corejam-type>
                    </corejam-box>
                    <corejam-base-link onClick={() => {
                        basketService.send({ type: "CONFIRM" });
                    }} href="#">
                        <corejam-type size="sm" weight="bold" transform="uppercase" decoration="underline">
                            Next
                                </corejam-type>
                    </corejam-base-link>

                </corejam-box>
            )
            case BasketStates.CONFIRMATION: return (
                <corejam-box>
                    <corejam-form-container name={this.orderConfirmFormId}>
                        {basket.state.items.map((cartItem) => <dershop-cart-line item={cartItem}></dershop-cart-line>)}
                        <corejam-form-submit formId={this.orderConfirmFormId}>
                            <button data-cy="buy-now" type="submit">
                                Buy Now
                        </button>
                        </corejam-form-submit>
                    </corejam-form-container>
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

                    <corejam-box w={8} pt={8} bWidthTop={1} bColor="gray-500">
                        {this.renderStep()}
                    </corejam-box>
                </corejam-box>
            </Host>
        );
    }
}
