import { Component, h, Host } from "@stencil/core";

@Component({
  tag: "auth-route-admin-index",
})
export class AdminUser {
  render() {
    return (
      <Host>
        <auth-admin-user-list page={1} />
      </Host>
    );
  }
}
