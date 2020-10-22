import { Component, Host, h } from "@stencil/core";
import { basketService, basketStore } from "../../shared/store/basket";
import { BasketStates } from "../../shared/machines/basket"

@Component({
    tag: "dershop-checkout",
})
export class CheckoutRoute {

    private checkoutFormId = "checkout1"

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
                                    formId={this.checkoutFormId}
                                    value=""
                                    type="text"
                                    placeholder="Firstname"
                                ></corejam-form-input>
                            </corejam-box>
                            <corejam-box w={6} pl={4}>
                                <corejam-form-input
                                    name="lastName"
                                    required
                                    formId={this.checkoutFormId}
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
                                formId={this.checkoutFormId}
                                label="Address"
                                placeholder="Address"
                            ></corejam-form-input>
                        </corejam-box>
                        <corejam-box flex>
                            <corejam-box w={6} pr={4}>
                                <corejam-form-input
                                    name="phoneNumber"
                                    type="text"
                                    formId={this.checkoutFormId}
                                    label="Zip Code"
                                    placeholder="Zip Code"
                                ></corejam-form-input>
                            </corejam-box>
                            <corejam-box w={6} pl={4}>
                                <corejam-form-input
                                    name="email"
                                    type="text"
                                    formId={this.checkoutFormId}
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
                                    formId={this.checkoutFormId}
                                    label="Phone number"
                                    placeholder="Phone"
                                ></corejam-form-input>
                            </corejam-box>
                            <corejam-box w={6} pl={4}>
                                <corejam-form-input
                                    name="email"
                                    type="email"
                                    formId={this.checkoutFormId}
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
                <corejam-box>confirm</corejam-box>
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
                        <corejam-form-container name={this.checkoutFormId}>
                            {this.renderStep()}
                        </corejam-form-container>
                    </corejam-box>
                </corejam-box>
            </Host>
        );
    }
}
