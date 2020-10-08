import { Component, Host, h, Prop, Watch } from "@stencil/core";
import { state, set } from "@corejam/router";

@Component({
  tag: "corejam-init",
  shadow: true,
})
export class Init {
  @Prop() router = null;

  async componentWillLoad() {
    if (!this.router) return;
    return new Promise((res) => {
      set("router", this.router);
      res();
    });
  }

  @Watch("router")
  newRouter(newval) {
    set("router", newval);
  }

  render() {
    return <Host>{state.router && <slot></slot>}</Host>;
  }
}
