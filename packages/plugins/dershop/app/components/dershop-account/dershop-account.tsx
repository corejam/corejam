import { coreState } from "@corejam/core-components";
import { authStore } from "@corejam/plugin-auth";
import { Component, h, Listen, State } from "@stencil/core";
import gql from "graphql-tag";
import { meGQL, updateUserGQL } from "../../../shared/graphql/Mutations/User";
import { User } from "../../../shared/types/User";

@Component({
  tag: "dershop-account",
})
export class AccountComponent {
  @State() user: User;
  private profileFormId = "profile";

  @Listen("sendForm", { target: "window" })
  async formEventHandler({ detail }) {
    if (detail.formId != this.profileFormId) return;

    return this.updateProfile(detail);
  }

  async queryData() {
    const request = await coreState.client.mutate({ mutation: gql(meGQL) });
    this.user = request.data.me;
  }

  async updateProfile(detail) {
    console.log(detail);

    const userInput = {};

    Object.keys(detail).map((value) => {
      if (detail[value].key) {
        userInput[detail[value].key] = detail[value].value;
      }
    });

    await coreState.client.mutate({
      mutation: gql(updateUserGQL),
      variables: {
        id: authStore.identity.user.id,
        userInput,
      },
    });
  }

  async componentWillRender() {
    if (authStore.identity) await this.queryData();
  }

  render() {
    return authStore.identity ? (
      <corejam-box max="xl" mx="auto" mt={12} px={4} lgPx={0}>
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
                  Personal details
                </corejam-base-link>
              </corejam-box>
              <corejam-box mb={4}>
                <corejam-base-link href="#" class="py-4 mb-1">
                  Address book
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
                <corejam-box w={6} pr={4}>
                  <corejam-form-input
                    label="First name"
                    required
                    name="firstName"
                    formId={this.profileFormId}
                    value={this.user.firstName}
                    type="text"
                    placeholder="Firstname"
                  ></corejam-form-input>
                </corejam-box>
                <corejam-box w={6} pl={4}>
                  <corejam-form-input
                    name="lastName"
                    required
                    formId={this.profileFormId}
                    value={this.user.lastName}
                    type="text"
                    placeholder="Lastname"
                    label="Last name"
                  ></corejam-form-input>
                </corejam-box>
              </corejam-box>
              <corejam-box flex mb={8}>
                <corejam-box w={6} pr={4}>
                  <corejam-form-input
                    name="birthday"
                    label="Birthday"
                    formId={this.profileFormId}
                    type="date"
                    placeholder="Birthday"
                  ></corejam-form-input>
                </corejam-box>
              </corejam-box>
              <corejam-box flex mb={8}>
                <corejam-box w={6} pr={4}>
                  <corejam-form-input
                    name="phoneNumber"
                    type="number"
                    formId={this.profileFormId}
                    label="Phone number"
                    placeholder="Phone"
                  ></corejam-form-input>
                </corejam-box>
                <corejam-box flex>
                  <corejam-box w={3} pt={8} bWidthTop={1} bColor="gray-500" mr={24}>
                    <corejam-box flex direction="col">
                      <corejam-box mb={4}>
                        <corejam-base-link href="#" class="py-4 mb-1">
                          Personal details
                                </corejam-base-link>
                      </corejam-box>
                      <corejam-box mb={4}>
                        <corejam-base-link href="#" class="py-4 mb-1">
                          Address book
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
                        <corejam-box w={6} pr={4}>
                          <corejam-form-input
                            label="First name"
                            required
                            name="firstName"
                            formId={this.profileFormId}
                            value={this.user.firstName}
                            type="text"
                            placeholder="Firstname"
                          ></corejam-form-input>
                        </corejam-box>
                        <corejam-box w={6} pl={4}>
                          <corejam-form-input
                            name="lastName"
                            required
                            formId={this.profileFormId}
                            value={this.user.lastName}
                            type="text"
                            placeholder="Lastname"
                            label="Last name"
                          ></corejam-form-input>
                        </corejam-box>
                      </corejam-box>
                      <corejam-box flex mb={8}>
                        <corejam-box w={6} pr={4}>
                          <corejam-form-input
                            name="birthday"
                            label="Birthday"
                            formId={this.profileFormId}
                            type="date"
                            placeholder="Birthday"
                          ></corejam-form-input>
                        </corejam-box>
                      </corejam-box>
                      <corejam-box flex mb={8}>
                        <corejam-box w={6} pr={4}>
                          <corejam-form-input
                            name="phoneNumber"
                            type="number"
                            formId={this.profileFormId}
                            label="Phone number"
                            placeholder="Phone"
                          ></corejam-form-input>
                        </corejam-box>
                        <corejam-box w={6} pl={4}>
                          <corejam-form-input
                            name="email"
                            type="email"
                            formId={this.profileFormId}
                            required
                            label="Email Address"
                            value={this.user.email}
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
                    <auth-reset-password-form></auth-reset-password-form>
                  </corejam-box>
                </corejam-box>
              </corejam-box>
              <corejam-base-link href="#">
                <corejam-form-submit formId={this.profileFormId}>
                  <corejam-type size="sm" weight="bold" transform="uppercase" decoration="underline">
                    Save
                  </corejam-type>
                </corejam-form-submit>
              </corejam-base-link>
            </corejam-form-container>
          </corejam-box>
        </corejam-box>
      </corejam-box>
    ) : (
        <div>Login</div>
      );
  }
}
