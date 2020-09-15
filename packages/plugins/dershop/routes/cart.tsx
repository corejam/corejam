import { Component, Host, h } from "@stencil/core";

@Component({
    tag: "dershop-route-cart",
    shadow: true,
})
export class CartRoute {
    render() {
        return (
            <Host>
                <dershop-header />
                <dershop-cart />
            </Host>
        );
    }
}
