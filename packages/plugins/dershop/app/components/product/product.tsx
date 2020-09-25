import { Component, Host, h, Prop, State, Event, EventEmitter } from "@stencil/core";
import { basketService } from "../../../shared/store/basket";
import { productByUrlGQL } from "../../../shared/graphql/Queries/Product";
import { coreState } from "@corejam/core-components";
import { Product } from "../../../shared/types/Product";

@Component({
  tag: "dershop-product",
  shadow: true,
})
export class ProductDetail {
  @State() _product: Product;
  @Prop() url: string;
  @Prop() product: string | Product;
  /**
   * Main Product Name
   */
  @Prop() name: string;
  /**
   * Product Description
   */
  @Prop() description: string;
  /**
   * Already formatted price as string with currency symbol
   */
  @Prop() price: number;
  /**
   * Image to be used for main hero image of the product.
   */
  @Prop() mainImage: string;
  /**
   * Images provided to enhance the product as a slideshow. Provided either
   * through comma separated string or as an array of strings.
   */
  @Prop() images: string | [];
  @Event() productAddedToCart: EventEmitter;

  async componentWillLoad() {
    if (this.url) {
      const variables = {
        url: this.url,
      };
      const data = await coreState.client.request(productByUrlGQL, variables);
      this._product = data.productByUrl;
    } else {
      this._product = this.product
        ? typeof this.product === "string"
          ? JSON.parse(this.product)
          : this.product
        : null;
    }
  }

  getImage(product: Product) {
    return (
      product?.images[0].src ||
      "https://images.unsplash.com/photo-1532003885409-ed84d334f6cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
    );
  }

  getSubImagesAsArray() {
    if (!this.images) return [];
    if (Array.isArray(this.images)) return this.images;
    return this.images.split(",");
  }

  buyProduct(e) {
    e.preventDefault();
    basketService.send({
      type: "ADDITEM",
      item: {
        ...this._product,
        quantity: 1,
      },
    });
    this.productAddedToCart.emit({
      item: {
        ...this._product,
        quantity: 1,
      },
    });
  }

  renderProduct(product: Product) {
    return (
      <corejam-box flex max="lg" mx="auto" mt={12} px={4} lgPx={0}>
        <corejam-box flex direction="col" mdDirection="row" justify="between" mb={12} w={12}>
          <corejam-box flex direction="col" w={12} mdW={6} mr={16}>
            <dershop-image
              h="detail"
              fit="cover"
              class="productMainImage"
              src={this.getImage(product)}
              alt="Product"
            ></dershop-image>
            <corejam-box mt={6} pb={6} hide="sm" show="md">
              <dershop-ui-grid grid cols={4} gap="2">
                {this.getSubImagesAsArray().map((image) => (
                  <dershop-image
                    h="32"
                    fit="cover"
                    class="object-cover opacity-25"
                    src={image}
                    alt="Product"
                  ></dershop-image>
                ))}
              </dershop-ui-grid>
            </corejam-box>
          </corejam-box>
          <corejam-box w={12} mdW={6} mt={6} mdMt={0} flex direction="col">
            <corejam-type data-cy="product-title" weight="bold" size="3xl" onClick={() => console.log("hahah")}>
              {product.name}
            </corejam-type>
            <corejam-box pt={4}>
              <corejam-type size="xl">{product.price.gross} €</corejam-type>
            </corejam-box>
            <corejam-type color="gray-700">
              <p>{product.description}</p>
            </corejam-type>
            <corejam-box flex justify="between" mt={8}>
              <corejam-box flex justify="between" w={3} p={2} bg="gray-200">
                <span>-</span>
                <span class="px-12 font-bold">1</span>
                <span>+</span>
              </corejam-box>
              <button id="add" data-cy="addToCart" onClick={(e) => this.buyProduct(e)}>
                <corejam-type transform="uppercase" weight="bold" size="sm">
                  Add to cart
                </corejam-type>
              </button>
              <corejam-box p={2} hide="sm" show="sm">
                <corejam-base-link href="#">
                  <corejam-type transform="uppercase" size="sm">
                    Add to wishlist
                  </corejam-type>
                </corejam-base-link>
              </corejam-box>
            </corejam-box>
          </corejam-box>
        </corejam-box>
      </corejam-box>
    );
  }

  @Prop({ reflect: false, mutable: true }) droppableElements = ["dershop-ui-box", "dershop-ui-grid"];

  render() {
    return <Host>{this._product && this.renderProduct(this._product)}</Host>;
  }
}
