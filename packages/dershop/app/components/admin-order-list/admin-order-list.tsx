import { Component, h, Host, Prop, State, Watch } from "@stencil/core";
import { adminPaginateOrdersGQL } from "../../../shared/graphql/Queries/Admin/Order";
import { authStore } from "@corejam/plugin-auth";
import { OrderList, OrderDB } from "../../../shared/types/Order";
import { coreState } from "@corejam/core-components";
import gql from "graphql-tag";

@Component({
  tag: "dershop-admin-order-list",
})
export class AdminOrderList {
  @Prop() data: any;
  @Prop() page: number;
  @State() _data: OrderList;
  @State() activePage = 1;

  @Watch("page")
  rerenderForPage() {
    this.queryData();
  }

  async queryData() {
    const request = await coreState.client.query({
      query: gql(adminPaginateOrdersGQL),
      variables: {
        page: this.page,
        size: 15,
      },
    });

    this._data = request.data.paginateOrders;
  }

  private tableHeader = ["Order ID", "Name", "Email", "Total", "Items", "Date Created"];

  async componentWillRender() {
    if (authStore.identity) await this.queryData();
  }

  render() {
    if (!authStore.identity) return <corejam-box mx="auto">Not authorized</corejam-box>;
    return (
      <Host>
        <corejam-box max="xl" flex direction="col" mx="auto">
          <corejam-box>
            <corejam-type as="h2" size="xl">
              Orders
            </corejam-type>
          </corejam-box>
          <corejam-box flex direction="col">
            <corejam-box px={5} bStyle="solid" bColor="gray-300" bWidth={1} flex pt={3} pb={3}>
              {this.tableHeader.map((header, i) => (
                <corejam-box w={2} key={i}>
                  {header}
                </corejam-box>
              ))}
            </corejam-box>
            {this._data.items.map((order: OrderDB, i) => {
              let bg = "";
              if (i % 2 == 0) {
                bg = "lightBlue-900";
              }
              return (
                <corejam-box px={5} bg={bg} bStyle="solid" bColor="gray-300" bWidth={1} flex pt={3} pb={3}>
                  <corejam-box w={3}>
                    <corejam-base-link data-cy="order-link" href={`/admin/order/view/${order.id}`}>
                      <dershop-ui-type>{order.id}</dershop-ui-type>
                    </corejam-base-link>
                  </corejam-box>
                  <corejam-box w={2}>{`${order.user.firstName} ${order.user.lastName}`}</corejam-box>
                  <corejam-box w={2}>{order.user.email}</corejam-box>
                  <corejam-box w={1}>{order.price.gross}</corejam-box>
                  <corejam-box w={1}>{order.items?.length}</corejam-box>
                  <corejam-box w={2}>{order.dateCreated}</corejam-box>
                </corejam-box>
              );
            })}
          </corejam-box>
          <corejam-box px={5} bStyle="solid" bColor="gray-300" bWidth={1} flex justify="between" pt={3} pb={3}>
            Showing {this._data.items.length} of {this._data.totalItems} entries
            <corejam-pagination paginator={this._data} />
          </corejam-box>
        </corejam-box>
      </Host>
    );
  }
}
