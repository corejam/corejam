import { Component, Element, Event, EventEmitter, h, Host, State } from "@stencil/core";

@Component({
  tag: "corejam-tabs",
  styles: `
    .buttons {
      position: absolute;
      bottom: 25px;
      left: 75px;
      display: flex;
      transition-property: height;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 1250ms;
    }

    .tab {
      padding-right: 0.5rem;
    }

    .tabButton {
      display: inline-block;
      padding: .1rem 0.4rem;
      background: var(--cj-colors-green-400, #4ade80);
      font-size: .8rem;
      color: var(--cj-colors-gray-700, #3f3f46);
      border-radius: 0.125rem;
      cursor: pointer;
      transition-property: color;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 150ms;
    }
    .tabButton:hover {
      color: #fff;
    }
    .tabButtonActive {
      color: var(--cj-colors-gray-100, #fafafa);
      background: var(--cj-colors-green-300, #86efac);
    }
  `,
  scoped: true,
})
export class CorejamTabs {
  private mutationO?: MutationObserver;
  @Element() el: HTMLElement;
  @State() activeTab = -1;
  @State() tabs: any[];
  @State() max = false;
  @Event() tabSelected: EventEmitter;
  componentWillLoad() {
    this.init();
  }

  init() {
    this.tabs = Array.from(this.el.querySelectorAll("corejam-tab"));
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
      if (index === i) {
        this.tabSelected.emit(tab.children[0].localName);
        tab.style.display = "block";
      } else {
        tab.style.display = "none";
      }
      return tab;
    });
  }

  render() {
    return (
      <Host style={{ display: "block", height: "100%", overflow: "scroll" }}>
        <div class="buttons" role="tablist">
          {this.tabs.map((tab, index) => (
            <div
              onClick={() => {
                this.displayTab(index);
              }}
            >
              <div class="tab">
                <span
                  class={{
                    tabButton: true,
                    tabButtonActive: this.activeTab === index,
                  }}
                >
                  {tab.header}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div style={this.activeTab === -1 && { display: "none" }}>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
