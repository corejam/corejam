import { Component, ComponentInterface, h, Host, Prop } from "@stencil/core";
type Link = {
  title: string;
  href: string;
};

@Component({
  tag: "dershop-header",
})
export class DershopHeader implements ComponentInterface {
  private _mainLinks: Link[] = [
    { href: "/products", title: "Products" },
    { href: "/brands", title: "Brands" },
  ];
  private _secondaryLinks: Link[] = [{ href: "/contact", title: "Contact" }];

  @Prop() maxScreen = "xl";
  @Prop() cartLink = "/cart";
  @Prop() xAlign = "auto";
  @Prop() mainLinks: string | any;
  @Prop() secondaryLinks: string | any;

  componentWillLoad() {
    this.parseLinks();
  }

  parseLinks() {
    if (this.mainLinks) {
      this._mainLinks = typeof this.mainLinks === "string" ? JSON.parse(this.mainLinks) : this.mainLinks;
    }
    if (this.secondaryLinks)
      this._secondaryLinks =
        typeof this.secondaryLinks === "string" ? JSON.parse(this.secondaryLinks) : this.secondaryLinks;
  }

  render() {
    return (
      <Host>
        <corejam-box max={this.maxScreen} mx={this.xAlign} px={2} xlPx={0} flex items="center" py={4} justify="between">
          <corejam-box flex w="60px" justify="between">
            <corejam-box mdHide>
              <dershop-hamburger></dershop-hamburger>
            </corejam-box>
            <dershop-inline-search></dershop-inline-search>
          </corejam-box>
          <corejam-box flex justify="center" grow={1} items="center">
            <corejam-box flex w="5" justify="evenly" mr={6} hide mdShow="flex">
              {this._mainLinks.map((link) => (
                <corejam-base-link href={link.href}>{link.title}</corejam-base-link>
              ))}
            </corejam-box>
            <corejam-base-link href="/">
              <dershop-logo></dershop-logo>
            </corejam-base-link>
            <corejam-box flex justify="evenly" w="5" ml={6} hide mdShow="flex">
              {this._secondaryLinks.map((link) => (
                <corejam-base-link href={link.href}>{link.title}</corejam-base-link>
              ))}
            </corejam-box>
          </corejam-box>
          <corejam-box flex w="60px" justify="between" direction="row-reverse">
            <corejam-base-link href={this.cartLink}>
              <dershop-cart-mini></dershop-cart-mini>
            </corejam-base-link>
            <corejam-identity></corejam-identity>
          </corejam-box>
        </corejam-box>
      </Host>
    );
  }
}
