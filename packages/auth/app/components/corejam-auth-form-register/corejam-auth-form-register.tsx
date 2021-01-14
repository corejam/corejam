import { Component, h, Host, Listen, Prop } from "@stencil/core";
import { coreState } from "@corejam/core-components";
import { runState } from "@corejam/run";
import gql from "graphql-tag";
import { userRegisterMutationGQL } from "../../../shared/graphql/Mutations";
import { authStore } from "../../store/authStore";

@Component({
  tag: "corejam-auth-form-register",
})
export class AuthRegister {
  private formId = "register";

  @Prop() onSuccess: Function;
  @Prop() onFail: Function;

  @Listen("sendForm", { target: "window" })
  async formEventHandler({ detail }) {
    if (detail.formId != this.formId) return;

    const request = await coreState.client.mutate({
      mutation: gql(userRegisterMutationGQL),
      variables: {
        data: {
          email: detail.email.value,
          password: detail.password.value,
          passwordConfirm: detail.passwordConfirm.value,
        },
      },
    });

    if (request.data.userRegister) {
      this.onSuccess ? this.onSuccess() : runState.router.push("/login");
    } else {
      this.onFail ? this.onFail() : null;
    }
  }

  componentWillLoad() {
    if (authStore.identity) runState.router.push("/");
  }

  render() {
    return (
      <Host>
        <corejam-box p={8} max="md" mx="auto" px={4} lgPx={0} flex justify="between" mb={24}>
          <corejam-box w={5} mx="auto">
            <corejam-form-container name={this.formId}>
              <corejam-box>
                <corejam-form-input
                  required={true}
                  name="email"
                  type="email"
                  formId={this.formId}
                  label="Email"
                ></corejam-form-input>
                <corejam-box>
                  <corejam-form-input
                    name="password"
                    type="password"
                    formId={this.formId}
                    label="Password"
                  ></corejam-form-input>
                </corejam-box>
                <corejam-box>
                  <corejam-form-input
                    name="passwordConfirm"
                    type="password"
                    formId={this.formId}
                    label="Confirm Password"
                  ></corejam-form-input>
                </corejam-box>
                <corejam-box>
                  <corejam-form-input
                    type="checkbox"
                    formId={this.formId}
                    label="I agree to the terms & conditions"
                  ></corejam-form-input>
                </corejam-box>
                <corejam-box>
                  <corejam-form-submit formId={this.formId}>
                    <button type="submit">Register</button>
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
