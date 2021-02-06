import { coreState } from "@corejam/core-components";
import { Component, h, Host } from "@stencil/core";
import gql from "graphql-tag";
import { allManufacturersGQL } from "../../../shared/graphql/Queries/Manufacturer";
import { ManufacturerDB } from "../../../shared/types/Manufacturer";

@Component({
  tag: "dershop-manufacturer-list",
})
export class IndexRoute {
  private _data;

  async componentWillLoad() {
    this._data = await (await coreState.client.query({ query: gql(allManufacturersGQL) })).data;
  }

  render() {
    return (
      <Host>
        <corejam-box max="xl" mx="auto" flex direction="col">
          <corejam-box w={12} py={10}>
            <corejam-type weight="bold" size="3xl" align="center">
              Brands
            </corejam-type>
          </corejam-box>
          <corejam-box justify="evenly" w={12} flex direction="row" data-cy="manufacturer-list" px={2}>
            {this._data.allManufacturers?.map((manu: ManufacturerDB) => {
              return (
                <corejam-box w={4} flex direction="row">
                  <corejam-box w={4} bg="gray-200" p={5}>
                    <corejam-base-link href={manu.seo?.url}>
                      <corejam-image src={manu.logo?.src}></corejam-image>
                    </corejam-base-link>
                  </corejam-box>
                  <corejam-box w={8} p={5}>
                    <corejam-base-link href={manu.seo?.url}>
                      <corejam-type>{manu.name}</corejam-type>
                    </corejam-base-link>
                  </corejam-box>
                </corejam-box>
              );
            })}
          </corejam-box>
        </corejam-box>
      </Host>
    );
  }
}
