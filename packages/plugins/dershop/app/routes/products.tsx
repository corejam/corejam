import { coreState } from "@corejam/core-components";
import { state } from "@corejam/router";
import { Component, Host, h, State } from "@stencil/core";
import gql from "graphql-tag";
import { searchProductsGQL } from "shared/graphql/Queries/Product";

@Component({
  tag: "dershop-route-products",
})
export class ProductRoute {
  @State() results: any = null;
  async componentWillLoad() {
    const term = location.search.replace("?searchTerm=", "");
    if (term) {
      const res = await coreState.client.query({
        query: gql(searchProductsGQL),
        variables: { search: term, page: 1, size: 10 },
      });
      this.results = res.data.productSearch;
    }
  }
  async componentDidRender() {
    state.router.onChange("url", async (val: any) => {
      if (val.search) {
        const term = val.search.replace("?searchTerm=", "");
        const res = await coreState.client.query({
          query: gql(searchProductsGQL),
          variables: { search: term, page: 1, size: 10 },
        });
        this.results = res.data.productSearch;
      }
    });
  }
  render() {
    return (
      <Host>
        {this.results && <dershop-product-list list={this.results}></dershop-product-list>}
        {!this.results && <dershop-product-list default></dershop-product-list>}
      </Host>
    );
  }
}
