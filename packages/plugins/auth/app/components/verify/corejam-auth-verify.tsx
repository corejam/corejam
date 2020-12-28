import { coreState } from "@corejam/core-components";
import { Component, h, Host, State } from "@stencil/core";
import gql from "graphql-tag";
import { verifyEmailGQL } from "../../../shared/graphql/Mutations";
import { STATUS } from "../../../shared/types/User";

@Component({
    tag: "corejam-auth-verify",
})
export class VerifyComponent {

    @State() verifyState = false;

    async componentDidLoad() {
        const params = new URLSearchParams(location.search);

        const request = await coreState.client.mutate({
            mutation: gql(verifyEmailGQL),
            variables: {
                email: params.get("email"),
                token: params.get("token"),
            },
        });

        if (request.data.userVerify.status === STATUS.VERIFIED) {
            this.verifyState = true
        }
    }

    render() {
        return (
            <Host>
                <corejam-box mx="auto">
                    {this.verifyState ? "verified" : "waiting"}
                </corejam-box>
            </Host>
        );
    }
}
