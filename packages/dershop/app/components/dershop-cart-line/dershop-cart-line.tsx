import { Component, ComponentInterface, h, Prop } from "@stencil/core";

@Component({
  tag: "dershop-cart-line",
})
export class DershopCartLine implements ComponentInterface {
  @Prop() item: any; //TODO type cart line items

  render() {
    return (
      <corejam-box
        class="cartItem"
        flex
        justify="between"
        py={5}
        bWidthBottom={1}
        bColor="gray-300"
        items="center"
        animation="fade"
      >
        <corejam-box flex w="5" items="center">
          <corejam-box flex w="2" mr={4}>
            <corejam-image fit="cover" src={this.item.images[0].src} alt=""></corejam-image>
          </corejam-box>
          <corejam-base-link href={`/${this.item.seo.url}`}>
            <corejam-type data-cy="cartItemName" weight="bold">
              {this.item.name}
            </corejam-type>
          </corejam-base-link>
        </corejam-box>
        <corejam-box>
          <corejam-type size="sm">{this.item.price.net}€</corejam-type>
        </corejam-box>
        <corejam-box>
          <corejam-type size="sm">{this.item.quantity}</corejam-type>
        </corejam-box>
        <corejam-box>
          <corejam-type size="sm">{this.item.price.net * this.item.quantity}€</corejam-type>
        </corejam-box>
      </corejam-box>
    );
  }
}
