import { Component, h, Element, Prop, Host } from "@stencil/core";
import { canvasService } from "../../shared/machines/canvas";

@Component({
  tag: "dershop-canvas-dragger",
  styleUrl: "dershop-canvas-dragger.css",
  shadow: false,
})
export class DershopCanvasDragger {
  @Element() dragger: HTMLElement;
  @Prop() tag: string;
  @Prop() canvas: string;
  sendMouseEvent(e) {
    canvasService.send(e);
  }

  send(e) {
    canvasService.send(e);
  }
  render() {
    const Tag = this.tag;
    return (
      <Host data-tag={this.tag} data-canvas={this.canvas}>
        <Tag hidden>tag</Tag>
        <span onMouseDown={(e) => this.send(e)}>{this.tag}</span>
      </Host>
    );
  }
}
