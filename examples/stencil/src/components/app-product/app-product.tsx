import { Component, h, Prop } from "@stencil/core";
import { productByUrlGQL } from "@corejam/plugin-dershop/dist/esm/shared/graphql/Queries/Product";
import { coreState } from "@corejam/core-components";

@Component({
  tag: "app-product",
})
export class AppProduct {
  @Prop() slug: string;
  _data: any;
  async componentWillLoad() {
    this._data = await coreState.client.request(productByUrlGQL, { url: this.slug });
  }
  render() {
    return <dershop-product product={this._data.productByUrl}></dershop-product>;
  }
}
