import { coreState } from "@corejam/core-components";
import { Component, Host, h } from "@stencil/core";
import gql from "graphql-tag";
import { ManufacturerDB } from "shared/types/Manufacturer";
import { allManufacturersGQL } from "../../../shared/graphql/Queries/Manufacturer";

@Component({
  tag: "dershop-manufacturer-list",
  shadow: true,
})
export class IndexRoute {
  private _data;

  async componentWillLoad() {
    this._data = await coreState.client.query({ query: gql(allManufacturersGQL) });
  }

  render() {
    return (
      <Host>
        {this._data.allManufacturers.map((manu: ManufacturerDB) => {
          return (
            <corejam-box>
              <corejam-base-link href={manu.seo?.url}>
                <corejam-type>{manu.name}</corejam-type>
              </corejam-base-link>
            </corejam-box>
          );
        })}
      </Host>
    );
  }
}
