import { coreState } from "@corejam/core-components";
import { Component, h, Host, State } from "@stencil/core";
import gql from "graphql-tag";
import { searchProductsGQL } from "../../shared/graphql/Queries/Product";

@Component({
  tag: "dershop-route-search",
})
export class SearchRoute {
  @State() term: string;
  @State() results: any = [];

  async componentWillRender() {
    if (this.term?.length > 3) {
      const res = await coreState.client.query({
        query: gql(searchProductsGQL),
        variables: { search: this.term, page: 1, size: 10 },
      });
      this.results = res.data.productSearch.items;
    }
  }

  render() {
    return (
      <Host>
        <corejam-box max="xl" mx="auto" p={2} xlP={0}>
          <input type="text" onKeyUp={(e) => (this.term = (e.target as HTMLInputElement).value)} />
          {this.results.length > 0 && this.results.map((result) => <corejam-box>{result.name}</corejam-box>)}
        </corejam-box>
      </Host>
    );
  }
}
