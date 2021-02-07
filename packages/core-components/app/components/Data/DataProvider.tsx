import { Component, h, Host, Prop } from "@stencil/core";
import { coreState } from "@stores/core";

@Component({
  tag: "corejam-data-provider",
})
export class DataProvider {
  @Prop({ reflect: true }) url: string;

  async componentWillLoad() {
    coreState.endpoint = this.url;
  }

  render() {
    return <Host></Host>;
  }
}
