import { coreState } from "@corejam/core-components";
import { authStore } from "../../store/authStore";
import { Component, h, Listen } from "@stencil/core";
import { userUpdateGQL } from "../../../shared/graphql/Mutations";

@Component({
    tag: "corejam-auth-account",
    shadow: true,
})
export class AccountComponent {

    private profileFormId = "profile";

    @Listen("sendForm", { target: "window" })
    async formEventHandler({ detail }) {
        if (detail.formId != this.profileFormId) return;

        return this.updateProfile(detail)
    }

    async updateProfile(detail) {
        console.log(detail)

        const userInput = {};

        Object.keys(detail).map(value => {
            if (detail[value].key) {
                userInput[detail[value].key] = detail[value].value
            }
        })

        await coreState.client.request(userUpdateGQL, {
            userInput
        })
    }

    render() {
        return (
            authStore.identity?.user ? <corejam-box max="xl" mx="auto" mt={12} px={4} lgPx={0} >
                <corejam-box mb={16}>
                    <corejam-type as="h2" size="3xl" align="center" weight="bold">
                        My Account
                    </corejam-type>
                </corejam-box>
                <corejam-box flex>
                    <corejam-box w={3} pt={8} bWidthTop={1} bColor="gray-500" mr={24}>
                        <corejam-box flex direction="col">
                            <corejam-box mb={4}>
                                <corejam-base-link href="#" class="py-4 mb-1">
                                    Account details
                                </corejam-base-link>
                            </corejam-box>
                            <corejam-box mb={4}>
                                <corejam-base-link href="#" class="py-4 mb-1">
                                    Settings
                                </corejam-base-link>
                            </corejam-box>
                        </corejam-box>
                    </corejam-box>
                    <corejam-box w={9} pt={8} bWidthTop={1} bColor="gray-500">
                        <corejam-form-container name={this.profileFormId}>
                            <corejam-box flex mb={8}>
                                <corejam-box w={6} pl={4}>
                                    <corejam-form-input
                                        name="email"
                                        type="email"
                                        formId={this.profileFormId}
                                        required
                                        label="Email Address"
                                        value={authStore.identity?.user.email}
                                        placeholder="Email"
                                    ></corejam-form-input>
                                </corejam-box>
                            </corejam-box>
                            <corejam-base-link href="#">
                                <corejam-form-submit formId={this.profileFormId} >
                                    <corejam-type size="sm" weight="bold" transform="uppercase" decoration="underline">
                                        Save
                                </corejam-type>
                                </corejam-form-submit>
                            </corejam-base-link>
                        </corejam-form-container>
                        <corejam-box bWidthBottom={1} bColor="gray-400" mb={8} mt={12}>
                            <corejam-type as="h3" size="xl">
                                Update Password
                        </corejam-type>
                        </corejam-box>
                        <corejam-box flex mb={8}>
                            <corejam-box w={6}>
                                <corejam-form-input
                                    id="currentpassword"
                                    type="password"
                                    label="Current Password"
                                    placeholder="Current password"
                                ></corejam-form-input>
                            </corejam-box>
                        </corejam-box>
                        <corejam-box flex mb={8}>
                            <corejam-box w={6}>
                                <corejam-form-input
                                    id="newpasswor"
                                    type="password"
                                    label="New Password"
                                    placeholder="New password"
                                ></corejam-form-input>
                            </corejam-box>
                        </corejam-box>
                        <corejam-box flex mb={8}>
                            <corejam-box w={6}>
                                <corejam-form-input
                                    id="confirmpassword"
                                    type="password"
                                    label="Confirm Password"
                                    placeholder="Confirm password"
                                ></corejam-form-input>
                            </corejam-box>
                        </corejam-box>
                        <corejam-base-link href="#">
                            <corejam-type size="sm" weight="bold" transform="uppercase" decoration="underline">
                                Save
                        </corejam-type>
                        </corejam-base-link>
                    </corejam-box>
                </corejam-box>
            </corejam-box >
                : <div>Login</div>
        )
    }
}