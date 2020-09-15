import { Component, h, Prop, Method, Host } from "@stencil/core";

@Component({
  tag: "dershop-product-box",
  shadow: true,
})
export class ProductBox {
  @Prop() name: string;
  @Prop() price?: number;
  @Prop() image?: string;
  @Prop() url: string;

  droppableELements = ["ui-box"];

  getImage() {
    return (
      this.image ||
      "https://images.unsplash.com/photo-1532003885409-ed84d334f6cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
    );
  }
  @Method()
  async getDroppableElements() {
    return this.droppableELements;
  }
  render() {
    return (
      <Host>
        <corejam-box direction="col">
          <corejam-base-link href={`/${this.url}`}>
            <corejam-image fit="cover" src={this.getImage()} h="300px"></corejam-image>
          </corejam-base-link>
          <corejam-type as="h3" size="xs">
            {this.name}
          </corejam-type>
          <corejam-type size="xs" color="lightblue-300">
            {this.price}€
          </corejam-type>
        </corejam-box>
      </Host>
    );
  }
}
