import { Component, Host, h, State, Prop, Element, Listen } from "@stencil/core";
import { canvasService } from "app/components/corejam-canvas/canvas.machine";

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
        <corejam-box position="relative" w={12} h="100vh" left={this.editMode ? 300 : 0}>
          <corejam-box
            position="absolute"
            w="300px"
            h="100vh"
            shadow={this.editMode ? "md" : "none"}
            hoverShadow="2xl"
            left={this.editMode ? -300 : -600}
          >
            <corejam-box flex direction="col" p={4} class="draggers">
              {this.draggers.map((dragItem) => (
                <corejam-box
                  py={2}
                  onMouseDown={canvasService.send}
                  data-component={dragItem}
                  style={{ userSelect: "none" }}
                >
                  {dragItem}
                </corejam-box>
              ))}
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
                  onClick={this.deploy}
                >
                  Deploy
                </corejam-button>
              </corejam-box>
            </corejam-box>
          </corejam-box>
          <corejam-box w={12} h="100vh" class="drop"></corejam-box>
        </corejam-box>
      </Host>
    );
  }
}
