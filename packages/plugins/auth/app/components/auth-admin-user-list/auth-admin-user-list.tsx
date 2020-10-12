import { Component, h, Host, Prop, State, Watch } from "@stencil/core";
import { coreState } from "@corejam/core-components";
import { paginateUsersGQL } from "../../../shared/graphql/Queries";
import { authStore } from "../../store/authStore";
import gql from "graphql-tag";

@Component({
  tag: "auth-admin-user-list",
  shadow: true,
})
export class AuthAdminUserList {
  @Prop() data: any;
  @Prop() page: number;
  @State() _data: any;
  @State() activePage = 1;

  @Watch("page")
  rerenderForPage() {
    this.queryData();
  }

  async queryData() {
    const request = await coreState.client.query({
      query: gql(paginateUsersGQL), variables: {
        page: this.page,
        size: 15,
      }
    });

    this._data = request.data.paginateUsers;
  }

  private tableHeader = ["Email", "Role", "Status", "Date Created"];

  async componentWillRender() {
   await this.queryData();
  }

  render() {
    return (
      <Host>
        <corejam-box max="xl" flex direction="col" mx="auto">
          <corejam-box>
            <corejam-type as="h2" size="xl">
              Users
            </corejam-type>
          </corejam-box>
          <corejam-box flex direction="col">
            <corejam-box px={5} bColor="gray-300" bWidth={1} flex pt={3} pb={3}>
              {this.tableHeader.map((header, i) => (
                <corejam-box w={3} key={i}>
                  {header}
                </corejam-box>
              ))}
            </corejam-box>
            {this._data.items.map((user, i) => {
              let bg = "";
              if (i % 2 == 0) {
                bg = "lightBlue-900";
              }
              return (
                <corejam-box px={5} bg={bg} bStyle="solid" bColor="gray-300" bWidth={1} flex pt={3} pb={3}>
                  <corejam-box w={3}>
                    <corejam-base-link data-cy="user-link" href={`/admin/users/edit/${user.id}`}>
                      <corejam-type>{user.email}</corejam-type>
                    </corejam-base-link>
                  </corejam-box>
                  <corejam-box w={3}>{user.role}</corejam-box>
                  <corejam-box w={3}>{user.active}</corejam-box>
                  <corejam-box w={3}>{user.dateCreated}</corejam-box>
                </corejam-box>
              );
            })}
          </corejam-box>
          <corejam-box px={5} bColor="gray-300" bWidth={1} flex justify="between" pt={3} pb={3}>
            Showing {this._data.items.length} of {this._data.totalItems} entries
            <corejam-pagination paginator={this._data} />
          </corejam-box>
        </corejam-box>
      </Host>
    );
  }
}
