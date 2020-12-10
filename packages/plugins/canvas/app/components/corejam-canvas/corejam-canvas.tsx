import { Component, Host, h, State, Prop, Element } from "@stencil/core";

@Component({
  tag: "corejam-canvas",
})
export class CorejamCanvas {
  @Element() el: HTMLElement;
  @Prop() canvas: any;
  @State() _canvas: any;

  render() {
    return (
      <Host>
        <corejam-box w={12} h="100vh" class="drop" style={{ touchAction: "none", userSelect: "none" }}>
          <slot></slot>
        </corejam-box>
        <corejam-canvas-editor></corejam-canvas-editor>
      </Host>
    );
  }
}
