import { Component, Host, h } from "@stencil/core";

@Component({
    tag: "dershop-route-login",
    shadow: true,
})
export class LoginRoute {

    render() {
        return (
            <Host>
                <corejam-auth-form-login></corejam-auth-form-login>
            </Host>
        );
    }
}
