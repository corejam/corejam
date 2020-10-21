import { Component, Host, h } from "@stencil/core";

@Component({
    tag: "dershop-brands",
})
export class BrandsRoute {
    render() {
        return (
            <Host>
                <dershop-manufacturer-list></dershop-manufacturer-list>
            </Host>
        )
    }
}