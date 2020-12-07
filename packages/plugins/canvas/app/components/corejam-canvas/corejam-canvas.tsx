import { Component, Host, h, State, Prop, Element, Listen } from "@stencil/core";
import { sendEventToMachine } from "app/components/corejam-canvas/canvas.machine";

@Component({
  tag: "corejam-canvas",
})
export class CorejamCanvas {
  @Element() el: HTMLElement;
  @Prop() draggers: string[] = ["corejam-box", "corejam-type"];
  @Prop() canvas: any;
  @State() editMode = false;
  @State() _canvas: any;

  @Listen("keyup", { target: "document" })
  keyup(e: KeyboardEvent) {
    if (e.key === "Dead") {
      this.editMode = !this.editMode;
      sendEventToMachine({ type: "toggle" });
    }
  }

  async deploy(e: InputEvent) {
    e.preventDefault();
    const stringifiedHtml = "<html>" + document.getElementsByTagName("html")[0].innerHTML + "</html>";
    const name = window.prompt("name");
    if (name) {
      await fetch("https://random.corejam.cloud/api/", {
        method: "POST",
        body: JSON.stringify({ name, body: stringifiedHtml }),
      });
    }
  }

  render() {
    return (
      <Host>
        <corejam-box position="relative" w={12} h="100vh">
          <corejam-box
            position="fixed"
            w="300px"
            p={6}
            bottom={10}
            left={this.editMode ? 10 : -300}
            shadow={this.editMode ? "md" : "none"}
            hoverShadow="2xl"
          >
            <corejam-box flex direction="col" p={4} class="draggers">
              {this.draggers.map((dragItem) => {
                const Tag = dragItem;
                return (
                  <corejam-box
                    py={2}
                    onPointerDown={sendEventToMachine}
                    data-component={dragItem}
                    style={{ userSelect: "none" }}
                  >
                    <Tag style={{ display: "none" }}></Tag>
                    {dragItem}
                  </corejam-box>
                );
              })}
              <corejam-box flex direction="col" pt={24}>
                <corejam-type as="h3" size="lg" weight="hairline">
                  Deploy to CDN
                </corejam-type>
                <corejam-button
                  w={6}
                  bg="green-200"
                  hoverBg="green-300"
                  p={2}
                  color="gray-700"
                  hoverColor="white"
                  onPointerUp={this.deploy}
                >
                  Deploy
                </corejam-button>
              </corejam-box>
            </corejam-box>
          </corejam-box>
          <corejam-box w={12} h="100vh" class="drop" style={{ touchAction: "none", userSelect: "none" }}>
            <slot></slot>
          </corejam-box>
        </corejam-box>
      </Host>
    );
  }
}
