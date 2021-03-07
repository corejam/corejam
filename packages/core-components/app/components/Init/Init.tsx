import { runSet, runState } from "@corejam/run";
import { Component, h, Host, Prop, Watch } from "@stencil/core";

@Component({
  tag: "corejam-init",
})
export class Init {
  @Prop() router = null;

  async componentWillLoad() {
    return new Promise((res) => {
      console.log(this.router);
      runSet("router", { ...this.router, onHrefRender: (url) => console.log(url), serializeURL: (url) => url });
      console.log(runState.router);
      return res(true);
    });
  }

  @Watch("router")
  newRouter(newval) {
    console.log("new router", newval);
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
