import { Component, Host, h, Element, State } from "@stencil/core";

@Component({
  tag: "app-liveview",
})
export class AppRouter {
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
