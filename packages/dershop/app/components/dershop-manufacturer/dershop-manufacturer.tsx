import { Component, h, Host, Prop, State } from "@stencil/core";
import { ManufacturerDB } from "../../../shared/types/Manufacturer";

@Component({
  tag: "dershop-manufacturer",
})
export class DershopManufacturer {
  @Prop() manufacturer: ManufacturerDB | string;
  @State() _manufacturer: ManufacturerDB;

  async componentWillLoad() {
    this._manufacturer = typeof this.manufacturer === "string" ? JSON.parse(this.manufacturer) : this.manufacturer;
  }

  render() {
    return (
      <Host>
        <corejam-box display="block" data-cy="product-list" max="xl" mx="auto" px={2} xlPx={0}>
          <corejam-box flex direction="col">
            <corejam-type weight="bold" size="3xl">
              {this._manufacturer.name}
            </corejam-type>
            <corejam-type as="p" color="gray-700">
              {this._manufacturer.description}
            </corejam-type>
          </corejam-box>
          <dershop-product-list list={this._manufacturer.products}></dershop-product-list>
        </corejam-box>
      </Host>
    );
  }
}
