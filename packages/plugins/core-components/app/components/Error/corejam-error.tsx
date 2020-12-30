import { Component, Host, h, Listen, State } from "@stencil/core";

@Component({
  tag: "corejam-error",
})
export class CorejamError {
  @State() error: any;

  @Listen("corejam:error", { target: "document" })
  newError(evt) {
    console.log(evt);
    this.error = evt.detail;
  }

  render() {
    return (
      <Host>
        {this.error &&
          <corejam-box onClick={() => (this.error = null)}>
            {this.error.msg}
          </corejam-box>
        }
      </Host>
    );
  }
}
