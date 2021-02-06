import { Component, h, Host, Listen, Prop } from "@stencil/core";
import { canvasService, Dragger } from "../corejam-canvas/canvas.machine";

@Component({
  tag: "corejam-builder",
})
export class CorejamBuilder {
  private demoDraggers: Dragger[] = [
    {
      id: "Row",
      component: "corejam-box",
      label: "Row",
      props: {
        flex: true,
        h: "100px",
      },
    },
    {
      id: "1/2Box",
      component: "corejam-box",
      label: "Half Box",
      props: {
        w: 6,
        h: "100px",
      },
    },
    {
      id: "Headline",
      component: "corejam-type",
      label: "Headline",
      props: {
        as: "h1",
        weight: "black",
        color: "blue-600",
      },
      initialContent: "Headline",
    },
    {
      id: "Sub headline",
      component: "corejam-type",
      label: "Sub Headline",
      props: {
        as: "h3",
        weight: "black",
        color: "blue-300",
      },
      initialContent: "Sub Headline",
    },
    {
      id: "Paragrap",
      component: "corejam-type",
      label: "Paragraph",
      props: {
        as: "p",
      },
      initialContent: "Lorem Greenum",
    },
  ];
  @Prop({ mutable: true }) draggers: Dragger[] = [];
  @Prop() demo = true;

  componentDidLoad() {
    if (this.demo) this.draggers = [...this.draggers, ...this.demoDraggers];
    canvasService.start();
  }

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
              <corejam-box h="25px">
                <corejam-box
                  py={2}
                  data-cy={`dragger-${dragItem.label.toLowerCase()}`}
                  data-cmp={JSON.stringify(dragItem)}
                  data-draggable
                >
                  <div style={{ display: "none" }}>
                    <Tag {...dragItem.props}>{dragItem.initialContent}</Tag>
                  </div>
                  {dragItem.label}
                </corejam-box>
              </corejam-box>
            );
          })}
        </corejam-box>
      </Host>
    );
  }
}
