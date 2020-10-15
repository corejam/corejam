import { coreState } from "@corejam/core-components";
import { Component, h, Prop, Watch, State } from "@stencil/core";
import gql from "graphql-tag";
import { paginateProductsGQL } from "../../../shared/graphql/Queries/Product";
import { ProductList as ProductListType } from "../../../shared/types/Product";

@Component({
  tag: "dershop-product-list",
  styleUrl: "product-list.css",
  shadow: true,
})
export class ProductList {
  @Prop() list: any;
  @Prop() page: Number = 1;
  @Prop() size: Number = 24;
  @Prop() default = false;
  @State() _list: ProductListType;
  @State() _size: Number = this.size;

  @Watch("page")
  @Watch("size")
  componentShouldUpdate(newValue, oldValue) {
    if (newValue !== oldValue) this.queryData();
  }
  async queryData() {
    //Query the default list
    const request = await coreState.client.query({
      query: gql(paginateProductsGQL), variables: {
        page: this.page,
        size: this._size,
      }
    });
    this._list = request.data.paginateProducts;
  }

  async componentWillLoad() {
    if (!this.list && this.default) {
      await this.queryData();
    } else {
      this._list = typeof this.list === "string" ? JSON.parse(this.list) : this.list;
    }
  }

  changeSize(e, size: Number) {
    e.preventDefault();
    this._size = size;
    this.queryData();
  }

  render() {
    if (!this._list) return "There is nothing here";

    return (
      <corejam-box display="block" data-cy="product-list" max="xl" mx="auto" px={2} xlPx={0}>
        <corejam-box flex direction="col" mdDirection="row">
          <corejam-box w={12} mdW={3} mdMr={6}>
            <dershop-sidebar sidebar={this._list.sidebar}></dershop-sidebar>
          </corejam-box>
          <corejam-box w={12} mdW={9} direction="col">
            <corejam-box flex w={12} justify="between" mt={8} mdMt={0} pb={2} bWidthBottom={1} bColor="gray-300" mb={6}>
              <corejam-box flex justify="between" w={12} pb={2}>
                <corejam-type size="xs" color="gray-800">
                  Showing {this._list.perPage < this._list.totalItems ? this._list.perPage : this._list.totalItems} of{" "}
                  {this._list.totalItems} Results
                </corejam-type>
                <corejam-type size="xs" color="gray-800">
                  Sort by Newness
                </corejam-type>
                <corejam-type size="xs" color="gray-800">
                  Show: <a onClick={(e) => this.changeSize(e, 24)}>24</a> |{" "}
                  <a onClick={(e) => this.changeSize(e, 48)}>48</a> | <a onClick={(e) => this.changeSize(e, 96)}>96</a>
                </corejam-type>
              </corejam-box>
            </corejam-box>
            <corejam-grid smTemplateColumns={2} mdTemplateColumns={3} lgTemplateColumns={4} gap-col={6} gap-row={12}>
              {this._list.items?.map((product, k) => (
                <dershop-product-box
                  data-cy="produx-box"
                  name={product.name}
                  image={product.images ? product.images[0].src : null}
                  price={product.price ? product.price.net : null}
                  url={product.seo ? product.seo.url : null}
                  key={k}
                />
              ))}
            </corejam-grid>
            <corejam-box mt={8}>
              <corejam-pagination paginator={this._list} />
            </corejam-box>
          </corejam-box>
        </corejam-box>
      </corejam-box>
    );
  }
}
