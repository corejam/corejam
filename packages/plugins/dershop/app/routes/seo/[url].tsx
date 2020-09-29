import { Component, Host, h, Prop, State } from "@stencil/core";
import { coreState } from "@corejam/core-components";
import { getObjectFromURL } from "../../../shared/graphql/Queries/URL";
import { SEODocument } from "shared/types/Seo";

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

    this._data = (
      await coreState.client.request(getObjectFromURL, {
        url: this._param.url,
      })
    ).objectFromURL;
    console.log(this._data);
    this._component = this.getComponentForRoute();
  }

  getComponentForRoute() {
    if ((this._object = this._data.product)) return <dershop-product product={this._object}></dershop-product>;
    if ((this._object = this._data.category))
      return <dershop-product-list list={this._object.products}></dershop-product-list>;
    if ((this._object = this._data.manufacturer))
      return <dershop-manufacturer manufacturer={this._object}></dershop-manufacturer>;
  }

  render() {
    return (
      <Host>
        {this._component}
        <dershop-seo seo={this._object.seo}></dershop-seo>
      </Host>
    );
  }
}
