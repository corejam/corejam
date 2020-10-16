import { coreState } from "@corejam/core-components";
import { Component, h, Host, Prop, State } from "@stencil/core";
import { SEODocument } from "shared/types/Seo";
import gql from "graphql-tag";
import { getObjectFromURL } from "../../../shared/graphql/Queries/URL";

@Component({
  tag: "dershop-url",
  shadow: true,
})
export class UrlRoute {
  @Prop() param: any;
  @State() _param: any;
  @State() _data: SEODocument;
  @State() _object: any;
  private _component;

  async componentWillLoad() {
    this._param = typeof this.param === "string" ? JSON.parse(this.param) : this.param;
    this._data = await (
      await coreState.client.query({
        query: gql(getObjectFromURL), variables: {
          url: this._param.url,
        }
      })
    ).data?.objectFromURL;

    this._component = this.getComponentForRoute();
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
