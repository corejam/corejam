import { Component, Host, h } from "@stencil/core";

@Component({
    tag: "corejam-auth-route-verify",
})
export class VerifyRoute {
    render() {
        return (
            <Host>
                <corejam-auth-header />
                <corejam-auth-verify />
            </Host>
        );
    }
}
