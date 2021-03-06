import { runSet } from "@corejam/run";
import { Component, h, Host, Prop, Watch } from "@stencil/core";

@Component({
  tag: "corejam-init",
})
export class Init {
  @Prop() router = null;

  async componentDidLoad() {
    if (!this.router) return;
    runSet("router", this.router);
  }

  @Watch("router")
  newRouter(newval) {
    runSet("router", newval);
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
