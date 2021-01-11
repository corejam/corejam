import { Component, Host, h, Prop, Listen } from "@stencil/core";
import { sendEventToMachine } from "../corejam-canvas/canvas.machine";
import type { Dragger } from "../corejam-canvas/canvas.machine";

@Component({
  tag: "corejam-builder",
})
export class CorejamBuilder {
  @Prop({ mutable: true }) draggers: Dragger[] = [];

  @Listen("corejam:canvas:addDragger", { target: "document" })
  addDragger(evt: CustomEvent) {
    if (evt.detail) {
      this.draggers = [...this.draggers, evt.detail];
    }
  }

  render() {
    return (
      <Host>
        <corejam-box flex direction="col" p={4} class="draggers">
          {this.draggers.map((dragItem) => {
            const Tag = dragItem.component;
            return (
              <corejam-box
                py={2}
                onPointerDown={sendEventToMachine}
                data-component={dragItem}
                style={{ userSelect: "none" }}
                data-cmp={JSON.stringify(dragItem)}
              >
                <div style={{ display: "none" }}>
                  <Tag {...dragItem.props}>{dragItem.initialContent}</Tag>
                </div>
                {dragItem.label}
              </corejam-box>
            );
          })}
        </corejam-box>
      </Host>
    );
  }
}
