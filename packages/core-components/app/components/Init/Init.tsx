import { Component, Host, h, Prop, Watch } from "@stencil/core";
import { runSet } from "@corejam/run";

@Component({
  tag: "corejam-init",
})
export class Init {
  @Prop({ reflect: false }) router = null;

  async componentWillLoad() {
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
