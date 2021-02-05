import { Component, h, Host } from "@stencil/core";

@Component({
  tag: "cj-route-admin-index",
})
export class AdminUser {
  render() {
    return (
      <Host>
        <corejam-auth-header />
        <auth-admin-user-list page={1} />
      </Host>
    );
  }
}
