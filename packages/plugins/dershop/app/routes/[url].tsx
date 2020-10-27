import { coreState } from "@corejam/core-components";
import { Component, h, Host, Prop, State, Watch } from "@stencil/core";
import { SEODocument } from "shared/types/Seo";
import gql from "graphql-tag";
import { getObjectFromURL } from "../../shared/graphql/Queries/URL";

@Component({
  tag: "dershop-url",
})
export class UrlRoute {
  @Prop() param: any;
  @State() _param: any;
  @State() _data: SEODocument;
  @State() _object: any;
  @State() _component;

  @Watch("param")
  async rerenderForUrl() {
    await this.getComponentFromParam()
  }

  /**
   * Query for the object from the url
   */
  async getComponentFromParam() {
    this._param = typeof this.param === "string" ? JSON.parse(this.param) : this.param;
    this._data = await (
      await coreState.client.query({
        query: gql(getObjectFromURL),
        variables: {
          url: this._param.url,
        },
      })
    ).data?.objectFromURL;

    this._component = this.getComponentForRoute();
  }

  async componentWillLoad() {
    await this.getComponentFromParam()
  }

  getComponentForRoute() {
    if ((this._object = this._data?.product)) return <dershop-product product={this._object}></dershop-product>;
    if ((this._object = this._data?.category))
      return <dershop-product-list list={this._object?.products}></dershop-product-list>;
    if ((this._object = this._data?.manufacturer))
      return <dershop-manufacturer manufacturer={this._object}></dershop-manufacturer>;
  }

  render() {
    return (
      <Host>
        {this._component}
        {this._object?.seo ? <dershop-seo seo={this._object.seo}></dershop-seo> : null}
      </Host>
    );
  }
}
