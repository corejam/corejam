import { Component, h, Host, ComponentInterface } from "@stencil/core";
import basket from "../../../shared/store/basket";

@Component({
    tag: "dershop-order-totals",
})
export class DerShopOrderTotals implements ComponentInterface {

    render() {
        return (
            <Host>
                <corejam-box>
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
                </corejam-box>
            </Host>
        )
    }
}