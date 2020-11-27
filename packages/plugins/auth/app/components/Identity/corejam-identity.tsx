import { Component, Element, h, Host, Prop, State, Listen } from "@stencil/core";
import { coreState } from "@corejam/core-components";
import { state as routerState } from "@corejam/router";
import { authStore } from "../../store/authStore";
import { userAuthenticateMutationGQL } from "../../../shared/graphql/Mutations";
import gql from "graphql-tag";

/**
 * Component to handle authentication state / refresh.
 */

@Component({
  tag: "corejam-identity",
})
export class CorejamIdentity {
  private formId = "identity";

  @Element() element: HTMLElement;
  @Prop() loginLink = "/login/";
  @Prop() registerLink = "/register/";
  @State() dropdown = false;

  @Listen("click", { target: "document" })
  handleClick(ev: MouseEvent) {
    let shouldClose = true;

    //Check if dropdown is open
    if (this.dropdown) {
      //Check if path doesnt have identity component in it
      ev.composedPath().forEach((element) => {
        if (element === this.element) {
          shouldClose = false;
        }
      });

      //Close it if it doesnt
      if (shouldClose) {
        this.toggleMenu();
      }
    }
  }

  componentWillLoad() {
    this.setRefreshTimer();
  }

  /**
   * Based on the token expiry we send a refresh request which
   * includes the refreshToken from cookies
   */
  setRefreshTimer() {
    setTimeout(() => {
      console.log("Refreshing token");
    }, 10000); //Time needs to come from this.token.expiry
  }

  toggleMenu = () => {
    this.dropdown = !this.dropdown;
  };

  logOut = () => {
    this.toggleMenu();
    authStore.identity = null;
  };

  @Listen("sendForm", { target: "window" })
  async formEventHandler({ detail }) {
    if (detail.formId != this.formId || authStore.identity) return;

    const request = await coreState.client.mutate({
      mutation: gql(userAuthenticateMutationGQL),
      variables: {
        email: detail.email.value,
        password: detail.password.value,
      },
    });

    if (request.data.userAuthenticate) {
      this.toggleMenu();
      authStore.identity = request.data.userAuthenticate;
      routerState.router.push("/");
    }
  }

  render() {
    return (
      <Host>
        <corejam-box position="relative" flex direction="row" justify="end">
          {authStore.identity ? (
            <corejam-type data-cy="identity-email">{authStore.identity.user.email}</corejam-type>
          ) : null}
          <corejam-icons-account onClick={() => this.toggleMenu()} />
          <corejam-box
            bg="white"
            shadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
            position="absolute"
            top={30}
            right={5}
            p={4}
            rounded="md"
            w="250px"
            style={{ display: this.dropdown ? "initial" : "none" }}
          >
            {authStore.identity ? (
              <corejam-box w={12} flex direction="col">
                <corejam-box>My Account</corejam-box>
                <corejam-box
                  onClick={() => {
                    this.logOut();
                  }}
                >
                  Log out
                </corejam-box>
              </corejam-box>
            ) : (
              <corejam-form-container name={this.formId}>
                <corejam-box pb={5} flex direction="col">
                  <corejam-box w={12}>
                    <corejam-form-input name="email" type="text" formId={this.formId} label="Email" />
                    <corejam-form-input name="password" type="password" formId={this.formId} label="Password" />
                  </corejam-box>
                  <corejam-box w={12} mt={8}>
                    <corejam-form-submit formId={this.formId}>
                      <corejam-button type="button" bg="black-900" color="white" pl="5" pr="5" pt="3" pb="3">
                        Login
                      </corejam-button>{" "}
                      or Register
                    </corejam-form-submit>
                  </corejam-box>
                </corejam-box>
              </corejam-form-container>
            )}
          </corejam-box>
        </corejam-box>
      </Host>
    );
  }
}
