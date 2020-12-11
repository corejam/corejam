import { Component, Host, h, State, Listen, Element } from "@stencil/core";
import { onCanvasChange } from "../corejam-canvas/canvas.machine";

@Component({
  tag: "corejam-tabs",
})
export class CjTabs {
  private mutationO?: MutationObserver;
  @Element()
  el!: HTMLElement;
  @State() activeTab = -1;
  @State() tabs: any[];
  @State() max = false;
  componentWillLoad() {
    this.init();
  }

  @Listen("propChanged")
  init() {
    this.tabs = Array.from(this.el.querySelectorAll("corejam-tab")).filter((node) => node.parentNode === this.el);
    this.displayTab(this.activeTab);
  }

  connectedCallback() {
    onCanvasChange("machine", (state) => {
      if (state.value === "inactive") this.activeTab = -1;
    });
    this.mutationO = new MutationObserver(() => {
      this.init();
    });
    this.mutationO.observe(this.el, {
      childList: true,
    });
  }

  displayTab(index: number) {
    this.activeTab = index;
    this.tabs = this.tabs?.map((tab, i) => {
      tab.style.display = index === i ? "block" : "none";
      return tab;
    });
  }

  render() {
    console.log(this.activeTab);
    return (
      <Host>
        <slot></slot>
        <corejam-box position="absolute" bottom={25} flex role="tablist">
          {this.tabs.map((tab, index) => (
            <corejam-box
              onClick={() => {
                if (tab.activeFn) tab.activeFn();
                this.displayTab(index);
              }}
              mr={4}
            >
              <corejam-button
                color={this.activeTab === index ? "gray-100" : "gray-700"}
                hoverColor="white"
                p="1"
                bg={this.activeTab === index ? "green-300" : "initial"}
                hoverBg="green-300"
                transition="colors"
                rounded="sm"
              >
                <corejam-type size="sm">{tab.header}</corejam-type>
              </corejam-button>
            </corejam-box>
          ))}
        </corejam-box>
      </Host>
    );
  }
}
