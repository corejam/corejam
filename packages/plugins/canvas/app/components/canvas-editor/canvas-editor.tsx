import { Component, Host, h, State, Prop } from "@stencil/core";
import { canvasState, sendEventToMachine } from "../corejam-canvas/canvas.machine";

@Component({
  tag: "corejam-canvas-editor",
})
export class CjDebugger {
  @State() max = false;
  @State() machineId: string;
  @Prop() draggers: string[] = ["corejam-box", "corejam-type", "corejam-test"];

  async deploy(e: InputEvent) {
    e.preventDefault();
    const stringifiedHtml = "<html>" + document.getElementsByTagName("html")[0].innerHTML + "</html>";
    const name = window.prompt("name");
    if (name) {
      await fetch("https://blabla-m-kyfhia.corejam.cloud/api/graphql", {
        method: "POST",
        body: JSON.stringify({ name, body: stringifiedHtml }),
      });
    }
  }

  render() {
    const activeEditor = canvasState.machine.matches("inactive") || canvasState.machine.matches("edit");
    return (
      <Host>
        {/* {!activeEditor && ( */}
        <corejam-box overflow="hidden" position="fixed" p={4} h={activeEditor ? "100px" : "400px"} bottom={5} w={12}>
          <corejam-box shadow="md" w={12} h="100%" mx="auto" rounded="lg" bWidth={1} bColor="gray-100" p={4}>
            <corejam-tabs onClick={() => sendEventToMachine({ type: "toggle" })}>
              <corejam-tab header="Builder">
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
                </corejam-box>
              </corejam-tab>
              <corejam-tab header="Deployment">
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
              </corejam-tab>
              <corejam-tab header="Settings"></corejam-tab>
              <corejam-tab header="Debug"></corejam-tab>
            </corejam-tabs>
          </corejam-box>
        </corejam-box>
      </Host>
    );
  }
}
