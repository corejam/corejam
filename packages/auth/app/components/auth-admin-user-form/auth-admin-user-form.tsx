import { coreState } from "@corejam/core-components";
import { Component, h, Host, Listen, Prop, State } from "@stencil/core";
import gql from "graphql-tag";
import { userEditMutationGQL } from "../../../shared/graphql/Mutations";
import { userByIdGQL } from "../../../shared/graphql/Queries";
import type { UserDB, UserInput } from "../../../shared/types/User";
import { authStore } from "../../store/authStore";

@Component({
  tag: "auth-admin-user-form",
})
export class AuthAdminUserForm {
  @Prop() error = false;
  @Prop() formId: string;
  @State() user: UserDB = null;
  @Listen("sendForm", { target: "window" })
  async formEventHandler({ detail }) {
    console.log("sendForm", detail);

    const input: UserInput = {};
    Object.keys(detail).map((key) => {
      input[key] = detail[key].value;
    });

    await coreState.client.mutate({
      mutation: gql(userEditMutationGQL),
      variables: {
        id: this.formId,
        userInput: input,
      },
    });
  }

  private userRoles = [
    { key: "admin", value: "admin" },
    { key: "user", value: "user" },
  ];

  async queryData() {
    const request = await coreState.client.query({
      query: gql(userByIdGQL),
      variables: {
        id: this.formId,
      },
    });

    if (request.data.userById) {
      this.user = request.data.userById;

      //Map over the roles and see if we match any we need to select
      this.userRoles.map((role) => {
        this.user.role.map((userRole) => {
          if (role.key === userRole) role["selected"] = true;
        });
      });
    }
  }

  async componentWillRender() {
    if (authStore.identity) await this.queryData();
  }

  render() {
    return (
      <Host>
        {authStore.identity ? (
          <corejam-box
            p={8}
            rounded="md"
            bWidth={1}
            bColor="gray-200"
            max="md"
            mx="auto"
            px={4}
            lgPx={0}
            flex
            justify="between"
            mb={24}
          >
            <corejam-box w={5} mx="auto">
              <corejam-box pb={4} mb={8} bWidthBottom={1} bColor="gray-400">
                <corejam-type as="h2" size="xl">
                  User Edit
                </corejam-type>
              </corejam-box>
              <corejam-form-container name="userForm">
                <corejam-box>
                  <corejam-box>
                    <corejam-form-input
                      name="email"
                      type="text"
                      formId="userForm"
                      value={this.user.email}
                      label="Email"
                    />
                  </corejam-box>
                  <corejam-box>
                    <corejam-form-input
                      name="active"
                      type="checkbox"
                      formId="userForm"
                      label="Active"
                      checked={this.user.active}
                    ></corejam-form-input>
                  </corejam-box>
                  <corejam-box>
                    <corejam-form-select name="roles" options={this.userRoles} multiple formId="userForm" />
                  </corejam-box>
                  <corejam-box>
                    <corejam-form-input name="password" type="password" formId="userForm" label="Password" />
                  </corejam-box>
                  <corejam-box>
                    <corejam-form-submit formId="userForm">
                      <button type="submit">Edit</button>
                    </corejam-form-submit>
                  </corejam-box>
                </corejam-box>
              </corejam-form-container>
            </corejam-box>
          </corejam-box>
        ) : null}
      </Host>
    );
  }
}
