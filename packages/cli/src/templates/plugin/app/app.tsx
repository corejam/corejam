import { Component, Fragment, h } from "@stencil/core";

@Component({
  tag: "pluginName-app",
})
export class PluginNameApp {
  render() {
    return (
      <Fragment>
        <corejam-app></corejam-app>
      </Fragment>
    );
  }
}
