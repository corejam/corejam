import { Component, h, Host, Prop } from "@stencil/core";
import { Sidebar } from "../../../shared/types/Sidebar";

@Component({
  tag: "dershop-sidebar",
})
export class SidebarComponent {
  @Prop() sidebar: Sidebar;

  render() {
    return (
      <Host>
        <corejam-box flex w={12} pb={2} mt={8} direction="col">
          <corejam-box bColor="gray-300" bWidthBottom={1} pb={4}>
            <corejam-type size="xs">Filter</corejam-type>
          </corejam-box>

          <corejam-box pb={2} justify={"between"} bWidthBottom={1} bColor="gray-300" pt={3}>
            <corejam-type color="gray-900" size="sm">
              Categories
            </corejam-type>
          </corejam-box>
          <corejam-box px={4} flex py={4} direction="col">
            {this.sidebar?.categories.map((category) => (
              <corejam-box py={1 / 2}>
                <corejam-base-link href={"/" + category.url}>
                  <corejam-type as="span" color="gray-600">
                    {category.name} ({category.itemCount})
                  </corejam-type>
                </corejam-base-link>
              </corejam-box>
            ))}
          </corejam-box>
          <corejam-box pb={2} justify={"between"} bWidthBottom={1} bColor="gray-300" pt={3}>
            <corejam-type color="gray-900" size="sm">
              Brands
            </corejam-type>
          </corejam-box>
          <corejam-box px={4} flex py={4} direction="col">
            {this.sidebar?.brands.map((brand) => (
              <corejam-box py={1 / 2}>
                <corejam-base-link href={"/" + brand.url}>
                  <corejam-type as="span" color="gray-600">
                    {brand.name} ({brand.itemCount})
                  </corejam-type>
                </corejam-base-link>
              </corejam-box>
            ))}
          </corejam-box>
        </corejam-box>
      </Host>
    );
  }
}
