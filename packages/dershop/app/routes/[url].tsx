import { coreState } from "@corejam/core-components";
import { Component, h, Host, Prop, State, Watch } from "@stencil/core";
import { SEODocument } from "../../shared/types/Seo";
import gql from "graphql-tag";
import { getObjectFromURL } from "../../shared/graphql/Queries/URL";

@Component({
  tag: "dershop-url",
})
export class UrlRoute {
  @Prop({ reflect: true }) param: any;
  @State() _param: any;
  @State() _data: SEODocument;
  @State() _object: any;

  @Watch("param")
  async rerenderForUrl() {
    await this.getComponentFromParam();
  }

  /**
   * Query for the object from the url
   */
  async getComponentFromParam() {
    const p = typeof this.param === "string" ? JSON.parse(this.param) : this.param;
    this._data = await (
      await coreState.client.query({
        query: gql(getObjectFromURL),
        variables: {
          url: p.url,
        },
      })
    ).data?.objectFromURL;
    console.log("seo", this._data);
  }

  async componentWillLoad() {
    await this.getComponentFromParam();
  }

  getComponentForRoute() {
    if (this._data?.product) return <dershop-product product={JSON.stringify(this._data?.product)}></dershop-product>;
    if (this._data?.category)
      return <dershop-product-list list={JSON.stringify(this._data?.category.products)}></dershop-product-list>;
    if (this._data?.manufacturer)
      return <dershop-manufacturer manufacturer={JSON.stringify(this._data?.manufacturer)}></dershop-manufacturer>;
  }

  render() {
    return <Host>{this.getComponentForRoute()}</Host>;
  }
}
