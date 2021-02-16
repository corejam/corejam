import { coreState } from "@corejam/core-components";
import { runState } from "@corejam/run";
import { Component, h, Host, Listen, Prop } from "@stencil/core";
import gql from "graphql-tag";
import { userAuthenticateMutationGQL } from "../../../shared/graphql/Mutations";
import { authStore } from "../../store/authStore";

@Component({
  tag: "auth-form-login",
})
export class LoginForm {
  private formId = "login";

  @Prop() onSuccess: Function;
  @Prop() onFail: Function;

  componentWillLoad() {
    if (authStore.identity) runState.router.push("/");
  }

  @Listen("sendForm", { target: "window" })
  async formEventHandler({ detail }) {
    if (detail.formId != this.formId) return;

    const request = await coreState.client.mutate({
      mutation: gql(userAuthenticateMutationGQL),
      variables: {
        email: detail.email.value,
        password: detail.password.value,
      },
    });

    if (request.data.userAuthenticate) {
      authStore.identity = request.data.userAuthenticate;
      this.onSuccess ? this.onSuccess() : runState.router.push("/");
    } else {
      this.onFail ? this.onFail() : null;
    }
  }

  render() {
    return (
      <Host>
        <corejam-box p={8} max="md" mx="auto" px={4} lgPx={0} flex direction="col" justify="between" mb={24}>
          <corejam-flash></corejam-flash>
          <corejam-box w={5} mx="auto">
            <corejam-form-container name={this.formId}>
              <corejam-box>
                <corejam-form-input name="email" type="text" formId={this.formId} label="Email"></corejam-form-input>
                <corejam-box>
                  <corejam-form-input
                    name="password"
                    type="password"
                    formId={this.formId}
                    label="Password"
                  ></corejam-form-input>
                </corejam-box>
                <corejam-box flex direction="col">
                  <corejam-box>
                    <corejam-form-submit formId={this.formId}>
                      <button type="submit">Login</button>
                    </corejam-form-submit>
                  </corejam-box>
                  <corejam-box>
                    <corejam-base-link href="/login/reset">Reset Password</corejam-base-link>
                  </corejam-box>
                </corejam-box>
              </corejam-box>
            </corejam-form-container>
          </corejam-box>
        </corejam-box>
      </Host>
    );
  }
}
