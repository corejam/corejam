import { Component, h, Host } from "@stencil/core";

@Component({
  tag: "dershop-route-register",
})
export class RegisterRoute {
  render() {
    return (
      <Host>
        <dershop-form-register></dershop-form-register>
      </Host>
    );
  }
}
