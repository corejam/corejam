import { state } from "@corejam/router";
import { Component, Host, h, State, Element, Listen } from "@stencil/core";
import { dershopState } from "app/store/dershop";

@Component({
  tag: "dershop-inline-search",
})
export class DershopInlineSearch {
  @State() active = false;
  @Element() el: HTMLElement;

  toggleSearch() {
    this.active = true;
  }

  @Listen("click", { target: "document" })
  click(e: any) {
    if (e.path.filter((c) => c.localName === "dershop-inline-search").length === 0) {
      this.active = false;
    }
  }

  @Listen("formEvent", { target: "document" })
  async formEvent({ detail }) {
    if (detail.name === "inline-search") state.router.push(`/products?searchTerm=${detail.value}`);
    dershopState.search = detail.value;
  }

  render() {
    const formEl = this.el.querySelector("corejam-form-input input") as HTMLInputElement;
    if (formEl) formEl.focus();
    return (
      <Host>
        <dershop-icons-spotlight onClick={() => this.toggleSearch()}></dershop-icons-spotlight>
        {this.active && (
          <corejam-box position="fixed" bg="white" top={0} right={0} left={0} h="82px" z={15}>
            <corejam-box flex items="center" max="xl" mx="auto" h="100%">
              <corejam-form-input
                formId="inline-search"
                type="text"
                autofocus
                bg="white"
                hoverBg="white"
                focusBg="white"
                name="search"
                value={dershopState.search}
                w={12}
                placeholder="Search the shop"
              ></corejam-form-input>
            </corejam-box>
          </corejam-box>
        )}
      </Host>
    );
  }
}
