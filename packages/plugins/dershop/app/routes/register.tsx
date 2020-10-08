import { Component, Host, h } from "@stencil/core";

@Component({
    tag: "dershop-route-register",
    shadow: true,
})
export class RegisterRoute {
    render() {
        return (
            <Host>
                <dershop-form-register></dershop-form-register>
            </Host>
        );
    }
}
