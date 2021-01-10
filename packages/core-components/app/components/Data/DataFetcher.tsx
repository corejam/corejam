import { Component, h, Host, Prop, State, Watch } from "@stencil/core";
import gql from "graphql-tag";
import { coreState } from "../../store/core";

@Component({
  tag: "corejam-data-fetcher",
})
export class DataFetcher {
  @Prop() query: string;
  @Prop() renderer: Function;
  @State() data: any = null;

  async componentWillLoad() {
    if (this.query) {
      this.fetchData();
    }
  }

  @Watch("query")
  async fetchData() {
    this.data = await coreState.client.query({ query: gql(this.query) });
  }

  renderData() {
    if (!this.query) return "No query.";
    if (this.renderer) {
      if (!this.data) this.renderer({ loading: true });
      if (this.data) this.renderer({ loading: false, data: this.data });
    } else {
      if (!this.data) return "Loading...";
      if (this.data) return JSON.stringify(this.data);
    }
  }
  render() {
    return <Host>{this.renderData()}</Host>;
  }
}
