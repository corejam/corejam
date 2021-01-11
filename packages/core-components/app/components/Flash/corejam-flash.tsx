import { Component, Host, h, Listen, State } from "@stencil/core";
import { FlashEventType } from "../../utils/events";

@Component({
  tag: "corejam-flash",
})
export class CorejamFlash {

  private colors = {
    success: "red",
    info: "blue",
    warning: "orange",
    error: "red"
  }

  @State() flash: FlashEventType;

  @Listen("corejam:flash", { target: "document" })
  flashEvent(evt: { detail: FlashEventType; }) {
    this.flash = evt.detail;
  }

  render() {
    return (
      <Host>
        {this.flash &&
          <corejam-box p={3} bWidth={1}
            rounded="md"
            bColor={`${this.colors[this.flash.type]}-700`}
            bg={`${this.colors[this.flash.type]}-300`}
            m={3}
            w={12} h="100%" onClick={() => (this.flash = null)}>
            {this.flash.msg}
          </corejam-box>
        }
      </Host>
    );
  }
}
