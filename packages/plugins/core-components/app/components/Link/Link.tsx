import { Component, Host, h, Prop, State } from "@stencil/core";
import { href } from "stencil-router-v2";
import { state as routerState } from "@corejam/router";
import { computeStyle } from "../../utils/computeStyle";
import { addStyleTagToHead } from "../../helpers/Style";
import { Link } from "./Link.types";

@Component({
  tag: "corejam-base-link",
})
export class BaseLink {
  @State() style: any[] = [];
  @State() computedStyle: string;
  @State() hash: string;

  @Prop() href: Link.Href;
  @Prop() color: Link.Color | "--cj-color-primary" = "--cj-color-primary";
  @Prop() hoverColor: Link.Color | "--cj-color-secondary" = "--cj-color-secondary";
  @Prop() decoration: Link.Decoration | "--cj-link-decoration" = "--cj-link-decoration";
  @Prop() hoverDecoration: Link.Decoration | "--cj-link-hover-decoration" = "--cj-link-hover-decoration";

  _relevantProps = ["color", "hoverColor", "decoration", "hoverDecoration"];

  async componentWillLoad() {
    await this.computeStyles();
  }

  async computeStyles() {
    return new Promise(async (res) => {
      const styleMap = (await import("../../utils/style")).generateStyleMap(this, "");
      const [hashCode, style] = computeStyle(styleMap);
      this.hash = hashCode;
      addStyleTagToHead(style, hashCode);
      res();
    });
  }

  renderLink() {
    if (routerState.router) {
      return (
        <a {...href(this.href, routerState.router)} class={this.hash}>
          <slot></slot>
        </a>
      );
    }
    return (
      <a href={this.href} class={this.hash}>
        <slot></slot>
      </a>
    );
  }

  render() {
    return <Host class={this.hash}>{this.renderLink()}</Host>;
  }
}
