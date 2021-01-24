import { Component, Host, h, State, Prop, Listen, Element, Method, Fragment } from "@stencil/core";
import { menuState } from "../../store/runStore";
import { Corejam } from "./Corejam";

@Component({
  tag: "corejam-menu",
  styles: `
    .icon {
      position: fixed;
      bottom: 25px;
      left: 25px;
      z-index: 600;
      width: 30px !important;
      height: 30px !important;
    }

    .menu-inner {
      padding: 1rem;
      padding-bottom: 4rem;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 500;
      height: 0px;
    }
    .active {
      height: 400px;
      backdrop-filter: blur(5px);
      background: rgba(255,255,255,0.65);
      border-top: 1px solid #ececec;
    }
    .full {
      height: calc(100vh - 83px);
    }
    .max {
      position: fixed;
      bottom: 25px;
      right: 20px;
      width: 25px !important;
      height: 25px !important;
      z-index: 700;
    }
  `,
})
export class CorejamMenu {
  @Element() instance: HTMLElement;
  @Prop() demo = false;
  @State() show = false;
  @State() max = false;
  @State() fullscreen = false;

  toggleMenu() {
    this.show = !this.show;
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
    menuState.tabs = [...menuState.tabs, tab];
  }

  @Listen("pointerdown", { target: "document" })
  click(e) {
    if (!this.show) return;
    if (!e.path.includes(this.instance)) {
      this.show = false;
      this.max = false;
      this.fullscreen = false;
    }
  }

  render() {
    return (
      <Host>
        <Corejam w="30px" h="30px" class="icon" onClick={() => this.toggleMenu()} />
        {this.show && (
          <Fragment>
            {this.max && (
              <svg
                class="max"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                onClick={() => (this.fullscreen = !this.fullscreen)}
              >
                <path
                  stroke="#374151"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8V4m0 0h4M3 4l4 4m8 0V4m0 0h-4m4 0l-4 4m-8 4v4m0 0h4m-4 0l4-4m8 4l-4-4m4 4v-4m0 4h-4"
                />
              </svg>
            )}
            <div
              class={{
                "menu-inner": true,
                active: this.max,
                full: this.fullscreen,
              }}
            >
              <corejam-tabs onTabSelected={() => (this.max = true)}>
                {menuState.tabs.map((tab) => {
                  const Cmp = tab.content;
                  return (
                    <corejam-tab header={tab.header}>
                      <Cmp />
                    </corejam-tab>
                  );
                })}
              </corejam-tabs>
            </div>
          </Fragment>
        )}
      </Host>
    );
  }
}
