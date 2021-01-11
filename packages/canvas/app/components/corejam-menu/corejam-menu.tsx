import { Component, Host, h, State, Listen, Method } from "@stencil/core";
import { canvasState, sendEventToMachine } from "../corejam-canvas/canvas.machine";
import { Corejam } from "./Corejam";

@Component({
  tag: "corejam-menu",
})
export class CjDebugger {
  @State() max = false;
  @State() machineId: string;
  @State() tabs = [
    {
      header: "Builder",
      component: "corejam-builder",
      event: "builder",
      activeFn: () => sendEventToMachine({ type: "build" }),
    },
  ];

  toggleMenu() {
    if (this.max) {
      sendEventToMachine({ type: "reset" });
    }
    this.max = !this.max;
  }

  renderTabs() {
    return this.tabs.map((tab) => {
      const Cmp = tab.component;
      return (
        <corejam-tab header={tab.header} activeFn={tab.activeFn}>
          <Cmp></Cmp>
        </corejam-tab>
      );
    });
  }

  /**
   * Add tab via custom event and dispatch on document.
   * @param e
   */
  @Listen("addCorejamMenuTab", { target: "document" })
  listenForTab(e: CustomEvent & { detail: { tab: any } }) {
    if (e.detail.tab) this.pushTabToState(e.detail.tab);
  }

  /**
   * Add tab via public component method
   * @param tab
   */
  @Method()
  async addTab(tab: any) {
    return new Promise((res, rej) => {
      if (tab) {
        this.pushTabToState(tab);
        return res("Added tab");
      }
      return rej("No tab provided");
    });
  }

  pushTabToState(tab: any) {
    this.tabs = [...this.tabs, tab];
    document.querySelector("corejam-tabs").dispatchEvent(new CustomEvent("propChanged"));
  }

  render() {
    return (
      <Host>
        <corejam-box bg="white" position="fixed" h="400px" bottom={0} w={12}>
          <corejam-box position="absolute" bottom={25} left={25} onClick={() => this.toggleMenu()} z={300}>
            <Corejam w="30px" h="30px" />
          </corejam-box>
          <corejam-box
            w={12}
            h="100%"
            mx="auto"
            p={4}
            pl={16}
            animation="all"
            show={this.max ? "flex" : "none"}
            bWidthTop={canvasState.machine.value !== "inactive" ? 1 : 0}
          >
            <corejam-tabs>{this.renderTabs()}</corejam-tabs>
          </corejam-box>
        </corejam-box>
      </Host>
    );
  }
}
