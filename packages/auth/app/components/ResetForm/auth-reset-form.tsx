import { coreState } from "@corejam/core-components";
import { runState } from "@corejam/run";
import { Component, Fragment, h, Host, Listen, State } from "@stencil/core";
import gql from "graphql-tag";
import { passwordResetGQL, requestPasswordResetGQL } from "../../../shared/graphql/Mutations";

@Component({
  tag: "auth-reset",
})
export class Reset {
  private resetEmailFormId = "resetEmail";
  private resetPasswordFormId = "resetPassword";

  @State() resetRequested = false;
  @State() resetWithToken = false;
  @State() resetCompleted = false;
  @State() token = null;

  @Listen("sendForm", { target: "window" })
  async formEventHandler({ detail }) {
    if (detail.formId == this.resetEmailFormId) return this.requestReset(detail);

    if (detail.formId == this.resetPasswordFormId) return this.resetPassword(detail);
  }

  async componentDidRender() {
    const reset = new URLSearchParams(location.search).get("reset");
    if (reset) {
      this.token = reset;
      this.resetWithToken = true;
    }
  }

  async requestReset(detail) {
    const userInput = {};

    Object.keys(detail).map((value) => {
      if (detail[value].key) {
        userInput[detail[value].key] = detail[value].value;
      }
    });

    const request = await coreState.client.mutate({
      mutation: gql(requestPasswordResetGQL),
      variables: userInput,
    });

    if (request.data.userRequestPasswordReset) {
      this.resetRequested = true;
    }
  }

  async resetPassword(detail) {
    const userInput = {};

    Object.keys(detail).map((value) => {
      if (detail[value].key) {
        userInput[detail[value].key] = detail[value].value;
      }
    });

    const request = await coreState.client.mutate({
      mutation: gql(passwordResetGQL),
      variables: {
        token: this.token,
        resetInput: userInput,
      },
    });

    if (request.data.userResetPassword) {
      this.resetCompleted = true;
      runState.router.push("/login");
    }
  }

  render() {
    return (
      <Host>
        <corejam-box p={8} max="md" mx="auto" px={4} lgPx={0} flex justify="between" mb={24}>
          <corejam-box w={5} mx="auto">
            {this.resetWithToken == false ? (
              <Fragment>
                {this.resetRequested == false ? (
                  <Fragment>
                    <corejam-box bWidthBottom={1} bColor="gray-400" mb={8} mt={12}>
                      <corejam-type as="h3" size="xl">
                        Reset Password
                      </corejam-type>
                    </corejam-box>
                    <corejam-form-container name={this.resetEmailFormId}>
                      <corejam-form-input
                        name="email"
                        type="text"
                        formId={this.resetEmailFormId}
                        label="Your Email"
                        placeholder="Your email"
                      ></corejam-form-input>
                      <corejam-base-link href="#">
                        <corejam-form-submit formId={this.resetEmailFormId}>
                          <corejam-type size="sm" weight="bold" transform="uppercase" decoration="underline">
                            Reset
                          </corejam-type>
                        </corejam-form-submit>
                      </corejam-base-link>
                    </corejam-form-container>
                  </Fragment>
                ) : (
                  <corejam-modal message="Please check your mail" type="success"></corejam-modal>
                )}
              </Fragment>
            ) : (
              <Fragment>
                {this.resetCompleted == false ? (
                  <Fragment>
                    <corejam-box bWidthBottom={1} bColor="gray-400" mb={8} mt={12}>
                      <corejam-type as="h3" size="xl">
                        Update Password
                      </corejam-type>
                    </corejam-box>
                    <corejam-form-container name={this.resetPasswordFormId}>
                      <corejam-box flex mb={8}>
                        <corejam-form-input
                          name="password"
                          type="password"
                          formId={this.resetPasswordFormId}
                          label="Password"
                          placeholder="Password"
                        ></corejam-form-input>
                      </corejam-box>
                      <corejam-box flex mb={8}>
                        <corejam-form-input
                          name="passwordConfirm"
                          type="password"
                          formId={this.resetPasswordFormId}
                          label="Confirm Password"
                          placeholder="Confirm Password"
                        ></corejam-form-input>
                      </corejam-box>
                      <corejam-base-link href="#">
                        <corejam-form-submit formId={this.resetPasswordFormId}>
                          <corejam-type size="sm" weight="bold" transform="uppercase" decoration="underline">
                            Reset
                          </corejam-type>
                        </corejam-form-submit>
                      </corejam-base-link>
                    </corejam-form-container>
                  </Fragment>
                ) : (
                  <corejam-type>Please check your mail</corejam-type>
                )}
              </Fragment>
            )}
          </corejam-box>
        </corejam-box>
      </Host>
    );
  }
}
