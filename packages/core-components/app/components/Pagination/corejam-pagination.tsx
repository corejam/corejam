import { Component, h, Host, Prop, State, Watch } from "@stencil/core";

@Component({
  tag: "corejam-pagination",
})
export class CorejamPagination {
  @Prop({ reflect: true }) paginator: any;
  @State() _paginator: any = { currentPage: 1, lastPage: 5, items: [] };
  @Watch("paginator")
  watchPaginator() {
    this.setState();
  }

  setState() {
    if (this.paginator)
      this._paginator = typeof this.paginator === "string" ? JSON.parse(this.paginator) : this.paginator;
  }

  componentWillLoad() {
    this.setState();
  }

  renderPaginate() {
    const elements = [];

    for (let i = 1; i <= this._paginator.lastPage; i++) {
      const props = {
        color: "gray-400",
      };
      if (i === this._paginator.currentPage) {
        props["color"] = "gray-900";
      }

      elements.push(
        <corejam-box px={4} bWidthRight={1} bColor="gray-200">
          <corejam-base-link href={`${i}`} decoration="none">
            <corejam-type {...props}>{i.toString()}</corejam-type>
          </corejam-base-link>
        </corejam-box>
      );
    }

    return elements;
  }

  render() {
    return (
      <Host>
        <corejam-box flex w="12" mt={8} justify="between" bWidthTop={1} bColor="gray-300" pt={4}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path
              class="heroicon-ui"
              d="M5.41 11H21a1 1 0 0 1 0 2H5.41l5.3 5.3a1 1 0 0 1-1.42 1.4l-7-7a1 1 0 0 1 0-1.4l7-7a1 1 0 0 1 1.42 1.4L5.4 11z"
            ></path>
          </svg>
          <corejam-box flex direction="row">
            {this.renderPaginate()}
          </corejam-box>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path
              class="heroicon-ui"
              d="M18.59 13H3a1 1 0 0 1 0-2h15.59l-5.3-5.3a1 1 0 1 1 1.42-1.4l7 7a1 1 0 0 1 0 1.4l-7 7a1 1 0 0 1-1.42-1.4l5.3-5.3z"
            ></path>
          </svg>
        </corejam-box>
      </Host>
    );
  }
}
