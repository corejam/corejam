import { Component, Host, h, Prop, Listen } from "@stencil/core";
import { authStore } from "../../store/authStore";
import { userAuthenticateMutationGQL } from "../../shared/graphql/Mutations";
import { coreState, routerState } from "@corejam/core-components";

@Component({
  tag: "corejam-auth-form-login",
  shadow: true,
})
export class AuthLoginForm {
  private formId = "login";

  @Prop() error = false;

  componentWillLoad() {
    if (authStore.identity) routerState.router.push("/");
  }

  @Listen("sendForm", { target: "window" })
  async formEventHandler({ detail }) {
    if (detail.formId != this.formId) return;

    const request = await coreState.client.request(userAuthenticateMutationGQL, {
      email: detail.email.value,
      password: detail.password.value,
    });

    if (request.userAuthenticate) {
      authStore.identity = request.userAuthenticate;

      routerState.router.push("/");
    }
  }

  render() {
    return (
      <Host>
        {authStore.identity ? (
          "Logged in"
        ) : (
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
                  Login {this.error ? "Error" : null}
                </corejam-type>
              </corejam-box>
              <corejam-form-container name={this.formId}>
                <corejam-box>
                  <corejam-form-input name="email" type="text" formId={this.formId} label="Email" />
                  <corejam-box>
                    <corejam-form-input name="password" type="password" formId={this.formId} label="Password" />
                  </corejam-box>
                  <corejam-box>
                    <corejam-form-submit formId={this.formId}>
                      <button data-cy="submit-login" type="submit">Login</button>
                    </corejam-form-submit>
                  </corejam-box>
                </corejam-box>
              </corejam-form-container>
            </corejam-box>
          </corejam-box>
        )}
      </Host>
    );
  }
}
