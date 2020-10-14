import { Component, h, Host, Listen } from "@stencil/core";
import { coreState } from "@corejam/core-components";
import { state as routerState } from "@corejam/router";
import { userRegisterMutationGQL } from "../../../shared/graphql/Mutations";
import { authStore } from "../../store/authStore";
import gql from "graphql-tag";

@Component({
  tag: "corejam-auth-form-register",
  shadow: true
})
export class AuthRegister {
  private formId = "register";

  @Listen("sendForm", { target: "window" })
  async formEventHandler({ detail }) {
    if (detail.formId != this.formId) return;

    const request = await coreState.client.mutate({
      mutation: gql(userRegisterMutationGQL), variables: {
        data: {
          email: detail.email.value,
          password: detail.password.value,
          passwordConfirm: detail.passwordConfirm.value
        }
      }
    });

    if (request.data.userRegister) {
      routerState.router.push("/login");
    }
  }

  componentWillLoad() {
    if (authStore.identity) routerState.router.push("/");
  }

  render() {
    return (
      <Host>
        <corejam-box
          p={8}
          rounded="md"
          bWidth={1}
          bColor="gray-200"
          max="md"
          mx="auto"
          px={4}
          px-lg="0"
          flex
          justify="between"
          mb={24}
        >
          <corejam-box w={5} mx="auto">
            <corejam-box pb={4} mb={8} bWidthBottom={1} bColor="gray-400">
              <corejam-type as="h2" size="xl">
                Register
              </corejam-type>
            </corejam-box>
            <corejam-form-container name={this.formId}>
              <corejam-box>
                <corejam-form-input required={true} name="email" type="email" formId={this.formId} label="Email" />
                <corejam-box>
                  <corejam-form-input name="password" type="password" formId={this.formId} label="Password" />
                </corejam-box>
                <corejam-box>
                  <corejam-form-input
                    name="passwordConfirm"
                    type="password"
                    formId={this.formId}
                    label="Confirm Password"
                  />
                </corejam-box>
                <corejam-box>
                  <corejam-form-input type="checkbox" formId={this.formId} label="I agree to the terms & conditions" />
                </corejam-box>
                <corejam-box>
                  <corejam-form-submit formId={this.formId}>
                    <button type="submit">
                      Register
                    </button>
                  </corejam-form-submit>
                </corejam-box>
              </corejam-box>
            </corejam-form-container>
          </corejam-box>
        </corejam-box>
      </Host>
    );
  }
}
