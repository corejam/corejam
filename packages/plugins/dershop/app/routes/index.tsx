import { settingsGQL } from "@corejam/base";
import { coreState } from "@corejam/core-components";
import { Component, Host, h } from "@stencil/core";
import gql from "graphql-tag";

@Component({
  tag: "dershop-route-index",
})
export class IndexRoute {
  private _data;

  async componentWillLoad() {
    this._data = await (await coreState.client.query({ query: gql(settingsGQL) })).data;
  }

  render() {
    return (
      <Host>
        <corejam-box>
          <corejam-image
            h="50vh"
            fit="cover"
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1889&q=80"
          ></corejam-image>
        </corejam-box>
        <dershop-seo seo={this._data.config.seo}></dershop-seo>
        <dershop-spotlight></dershop-spotlight>
        <dershop-testimonial></dershop-testimonial>
      </Host>
    );
  }
}
