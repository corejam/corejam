import { coreState } from "@corejam/core-components";
import { Component, h, Prop, State, Watch } from "@stencil/core";
import gql from "graphql-tag";
import { paginateProductsGQL } from "../../../shared/graphql/Queries/Product";
import { ProductList as ProductListType } from "../../../shared/types/Product";

@Component({
  tag: "dershop-product-list",
})
export class ProductList {
  @Prop() list: any;
  @Prop() page: Number = 1;
  @Prop() size: Number = 24;
  @Prop() default = false;
  @State() _list: ProductListType;
  @State() _size: Number = this.size;

  @Watch("list")
  listUpdate(newValue) {
    this._list = typeof newValue === "string" ? JSON.parse(newValue) : newValue;
  }

  @Watch("default")
  @Watch("page")
  @Watch("size")
  getNewData() {
    this.queryData();
  }
  async queryData() {
    //Query the default list
    const request = await coreState.client.query({
      query: gql(paginateProductsGQL),
      variables: {
        page: this.page,
        size: this._size,
      },
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
          <corejam-box w="12" mdW="3" mdMr={6}>
            <dershop-sidebar sidebar={this._list.sidebar}></dershop-sidebar>
          </corejam-box>
          <corejam-box w="12" mdW="9" direction="col">
            <corejam-box flex w="12" justify="between" mt={8} mdMt={0} pb={2} bWidthBottom={1} bColor="gray-300" mb={6}>
              <corejam-box flex justify="between" w="12" pb={2}>
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
            <corejam-grid smTemplateColumns="2" mdTemplateColumns="3" lgTemplateColumns="4" gapCol={6} gapRow={12}>
              {this._list.items?.map((product) => (
                <dershop-product-box
                  key={product.name}
                  data-cy="produx-box"
                  name={product.name}
                  image={product.images ? product.images[0].src : null}
                  price={product.price ? product.price.net : null}
                  url={product.seo ? product.seo.url : null}
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
