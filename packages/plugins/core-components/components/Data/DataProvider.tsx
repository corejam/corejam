import { Component, h, Host, Prop } from "@stencil/core";
import { coreState } from "../../store/core";

@Component({
  tag: "corejam-data-provider",
})
export class DataProvider {
  @Prop() url: string;

  async componentWillLoad() {
    coreState.endpoint = this.url;
  }

  render() {
    return <Host></Host>;
  }
}
