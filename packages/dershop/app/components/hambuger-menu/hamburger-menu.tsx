import { Component, Element, h, Host, Listen, State } from "@stencil/core";

const CloseIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#fff" {...props}>
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

@Component({
  tag: "dershop-hamburger",
})
export class DershopHamburgerMenu {
  @State() active = false;
  @Element() el: HTMLElement;

  @Listen("routeChange", { target: "document" })
  routeChangeCb({ detail }) {
    if (detail.type === "routechange") if (this.active) this.hideDrawer();
  }

  showDrawer() {
    this.active = true;
    document.body.style.transform = "translate(200px, 0)";
    document.body.style.transition = "0.5s ease-in-out";
    this.el.querySelector("corejam-box").style.transition = "0.3s ease-in-out";
    this.el.querySelector("corejam-box").style.transform = "translate(200px, 0)";
  }

  hideDrawer() {
    document.body.style.transform = "initial";
    document.body.style.transition = "0.2s ease-in-out";
    this.el.querySelector("corejam-box").style.transition = "0.2s ease-in-out";
    this.el.querySelector("corejam-box").style.transform = "translate(-200px, 0)";
    this.active = false;
  }

  render() {
    return (
      <Host>
        <dershop-icons-menu onClick={() => (this.active ? this.hideDrawer() : this.showDrawer())}></dershop-icons-menu>
        <corejam-box flex p={4} position="absolute" left={-400} top={0} bottom={0} bg="black" z={10} w={6}>
          <corejam-box position="absolute" top={20} right={20} z={11} h="20px">
            <CloseIcon onClick={() => this.hideDrawer()} />
          </corejam-box>

          <corejam-box pt={32}>
            <corejam-box py={4}>
              <corejam-base-link href="/search">
                <corejam-type as="span" color="white">
                  Search
                </corejam-type>
              </corejam-base-link>
            </corejam-box>
            <corejam-box py={4}>
              <corejam-base-link href="/products">
                <corejam-type as="span" color="white">
                  Products
                </corejam-type>
              </corejam-base-link>
            </corejam-box>
            <corejam-box py={4}>
              <corejam-base-link href="/brands">
                <corejam-type as="span" color="white">
                  Brands
                </corejam-type>
              </corejam-base-link>
            </corejam-box>
          </corejam-box>
          <corejam-box>hi</corejam-box>
        </corejam-box>
      </Host>
    );
  }
}
