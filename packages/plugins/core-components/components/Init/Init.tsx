import { Component, Host, h, Prop, Watch } from "@stencil/core";
import { createRouter } from "stencil-router-v2";
import { routerSet, routerState } from "../../store/core";

@Component({
  tag: "corejam-init",
  shadow: true,
})
export class Init {
  @Prop() router = null;

  async componentWillLoad() {
    return new Promise((res) => {
      routerSet("router", this.router ? this.router : { ...createRouter() });
      res();
    });
  }

  @Watch("router")
  newRouter(newval) {
    routerSet("router", newval);
  }

  render() {
    return <Host>{routerState.router && <slot></slot>}</Host>;
  }
}
