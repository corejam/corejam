import { href, routerState } from "@corejam/run";
import { Component, Event, EventEmitter, h, Prop, State } from "@stencil/core";
import { Link } from "./Link.types";

@Component({
  tag: "corejam-base-link",
})
export class BaseLink {
  @State() style: any[] = [];
  @State() computedStyle: string;
  @State() hash: string;

  @Prop({ reflect: true }) href: Link.Href;
  @Prop({ reflect: true }) color: Link.Color | "--cj-color-primary" = "--cj-color-primary";
  @Prop({ reflect: true }) hoverColor: Link.Color | "--cj-color-secondary" = "--cj-color-secondary";
  @Prop({ reflect: true }) decoration: Link.Decoration | "--cj-link-decoration" = "--cj-link-decoration";
  @Prop({ reflect: true }) hoverDecoration: Link.Decoration | "--cj-link-hover-decoration" =
    "--cj-link-hover-decoration";

  @Event() routeChange: EventEmitter;

  async componentWillRender() {
    const hash = await (await import("../../utils/style")).calculateStyles(this);
    this.hash = hash;
  }

  render() {
    const defaultProps = href(this.href, routerState.router);
    const overwrittenProps = {
      ...defaultProps,
      onClick: (ev: MouseEvent) => {
        this.routeChange.emit({ type: "routechange", newUrl: this.href });
        if (typeof defaultProps.onClick === "function") defaultProps.onClick(ev);
        window.scrollTo({ top: 0 });
      },
    };

    return (
      <a {...overwrittenProps} class={this.hash}>
        <slot></slot>
      </a>
    );
  }
}
