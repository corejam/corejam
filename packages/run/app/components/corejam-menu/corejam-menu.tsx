import { Component, Host, h, State, Listen, Method, Prop } from "@stencil/core";
// import { canvasState, sendEventToMachine } from "../../../../canvas/app/components/corejam-canvas/canvas.machine";
import { Corejam } from "./Corejam";

@Component({
  tag: "corejam-menu",
  styles: `
    .menu {
      background: #fff;
      position: fixed;
      bottom: 0;
      height: 400px; 
      width: 100%;
    }

    .menu-inner {
      width: 100%;
      height: 100%;
      margin-left: auto;
      margin-right: auto;
      padding: 4rem;
      padding-left: 16rem;
    }
    .icon {
      position="absolute" bottom={25} left={25} 
      position: absolute;
      bottom: 25px;
      left: 25px;
      z-index: 300;
    }
  `,
})
export class CjDebugger {
  @Prop() demo = false;
  @State() max = false;
  @State() machineId: string;
  @State() tabs = [
    {
      header: "Builder",
      component: "corejam-builder",
      props: {
        demo: this.demo,
      },
      event: "builder",
      // activeFn: () => sendEventToMachine({ type: "build" }),
    },
    {
      header: "Deploy",
      component: "corejam-deploy",
      props: {
        demo: this.demo,
      },
      event: "deploy",
      // activeFn: () => sendEventToMachine({ type: "reset" }),
    },
  ];

  toggleMenu() {
    if (this.max) {
      // sendEventToMachine({ type: "reset" });
    }
    this.max = !this.max;
  }

  renderTabs() {
    return this.tabs.map((tab) => {
      const Cmp = tab.component;
      return (
        <corejam-tab header={tab.header}>
          <Cmp {...tab.props}></Cmp>
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
        <div class="menu">
          <Corejam w="30px" h="30px" class="icon" onClick={() => this.toggleMenu()} />
          <div
            class="menu-inner"
            // animation="all"
            style={{ display: this.max ? "flex" : "none" }}
            // bWidthTop={canvasState.machine.value !== "inactive" ? 1 : 0}
          >
            <corejam-tabs>{this.renderTabs()}</corejam-tabs>
          </div>
        </div>
      </Host>
    );
  }
}
