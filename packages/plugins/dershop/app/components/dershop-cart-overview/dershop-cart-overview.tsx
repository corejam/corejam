import { Component, h } from "@stencil/core";
import { ProductDB } from "../../../shared/types/Product";
import basket from "../../../shared/store/basket";

@Component({
    tag: "dershop-cart-overview",
})
export class DershopCartOverview {

    render() {
        return (
            <corejam-box bg="gray-200" flex direction="col">
                <corejam-box p={3}>
                    <corejam-type size="sm" weight="bold">Order Overview</corejam-type>
                </corejam-box>
                <corejam-box p={3} bWidthBottom={1} bColor="gray-400">
                    <corejam-type>
                        {basket.state.items.length} Item in Cart
                    </corejam-type>
                </corejam-box>
                {basket.state.items.map((cartItem: ProductDB) => {
                    return (
                        <corejam-box justify="between" p={3} flex direction="row">
                            <corejam-box w={4}>
                                <corejam-image src={cartItem.images[0].src}></corejam-image>
                            </corejam-box>
                            <corejam-box>
                                <corejam-box>{cartItem.name}</corejam-box>
                                <corejam-box>{cartItem.price.net}</corejam-box>
                            </corejam-box>
                        </corejam-box>
                    )
                })}
            </corejam-box>
        )

    }
}