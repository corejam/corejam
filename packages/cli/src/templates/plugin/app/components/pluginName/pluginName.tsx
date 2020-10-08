import { Component, h } from "@stencil/core";
import pluginName from "../../../shared/pluginName";
import store from "../../store/pluginName";
@Component({
  tag: "cj-pluginName",
  shadow: true,
})
export class PluginName {
  render() {
    return (
      <corejam-box>
        <h1>Hi, this is {store.pluginName}</h1>
        {pluginName()}
      </corejam-box>
    );
  }
}
