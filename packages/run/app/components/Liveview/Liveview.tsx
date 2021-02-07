import { Component, Element, h, Host, State } from "@stencil/core";

@Component({
  tag: "corejam-dev-liveview",
})
export class CorejamDevLiveview {
  @State() markup: string;
  @Element() component: HTMLElement;
  componentWillLoad() {
    const urlParams = new URLSearchParams(window.location.search);
    const markup = JSON.parse(urlParams.get("data")).content;
    this.markup = markup;
  }
  render() {
    return <Host innerHTML={this.markup}></Host>;
  }
}
