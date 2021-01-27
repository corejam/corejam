import { Image } from "@corejam/base/dist/typings/Image";
import { coreState } from "@corejam/core-components";
import { Component, Event, EventEmitter, h, Host, Prop, State } from "@stencil/core";
import gql from "graphql-tag";
import { productByUrlGQL } from "../../../shared/graphql/Queries/Product";
import { basketService } from "../../../shared/store/basket";
import { Product } from "../../../shared/types/Product";

@Component({
  tag: "dershop-product",
})
export class ProductDetail {
  @State() _product: Product;
  @State() _activeThumb: Image;
  @Prop() url: string;
  @Prop({ reflect: true }) product: string | Product;
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
      const data = await coreState.client.query({ query: gql(productByUrlGQL), variables });
      this._product = data.data.productByUrl;
      this._activeThumb = data.data.productByUrl.images[0];
    } else {
      console.log(this.product);
      const product = typeof this.product === "string" ? JSON.parse(this.product) : this.product;
      this._product = product;
      this._activeThumb = product.images[0];
    }
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
              data-cy="product-image"
              src={this._activeThumb?.src}
              alt={this._product.name}
            ></dershop-image>
            <corejam-box mt={6} pb={6}>
              <corejam-box flex direction="row">
                {this._product.images?.map((image) => (
                  <corejam-box px={2}>
                    <dershop-image
                      h="32"
                      fit="cover"
                      data-cy="product-thumb"
                      onClick={() => {
                        this._activeThumb = image;
                      }}
                      src={image.src}
                      alt={this._product.name}
                    ></dershop-image>
                  </corejam-box>
                ))}
              </corejam-box>
            </corejam-box>
          </corejam-box>
          <corejam-box w={12} mdW={6} mt={6} mdMt={0} flex direction="col">
            <corejam-type data-cy="product-title" weight="bold" size="3xl">
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
              <corejam-box p={2} hide mdShow="flex">
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
