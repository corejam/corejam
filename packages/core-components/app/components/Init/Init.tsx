import { setPatchedRouter } from "@corejam/run";
import { Component, h, Host, Prop, Watch } from "@stencil/core";

@Component({
  tag: "corejam-init",
})
export class Init {
  @Prop() router = null;

  async componentWillLoad() {
    return new Promise((res) => {
      setPatchedRouter(this.router);
      return res(true);
    });
  }

  @Watch("router")
  newRouter(router) {
    setPatchedRouter(router);
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
