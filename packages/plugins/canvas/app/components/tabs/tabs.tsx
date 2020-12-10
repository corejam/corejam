import { Component, Host, h, State, Listen, Element } from "@stencil/core";

@Component({
  tag: "corejam-tabs",
})
export class CjTabs {
  private mutationO?: MutationObserver;
  @Element()
  el!: HTMLElement;
  @State() activeTab = 0;
  @State() tabs: any[];

  componentWillLoad() {
    this.init();
  }

  @Listen("propChanged")
  init() {
    this.tabs = Array.from(this.el.querySelectorAll("corejam-tab")).filter((node) => node.parentNode === this.el);
    this.displayTab(this.activeTab);
  }

  connectedCallback() {
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
    return (
      <Host>
        <slot></slot>

        <corejam-box position="absolute" bottom={15} flex role="tablist" bg="white" h="50px">
          {this.tabs.map((tab, index) => (
            <corejam-box onClick={() => this.displayTab(index)} mr="4">
              <corejam-button
                color="gray-700"
                hoverColor="white"
                p={1}
                bg={this.activeTab === index ? "white" : "initial"}
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
