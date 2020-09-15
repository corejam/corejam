import { Component, Host, h } from "@stencil/core";

@Component({
  tag: "corejam-auth-header",
  shadow: true,
})
export class CorejamAuthHeader {
  render() {
    return (
      <Host>
        <corejam-box max="xl" mx="auto" px={2} xlPx={0} flex items="center" py={4}>
          <corejam-box flex w={2}>
            <corejam-box>
              <corejam-base-link href="/" mr={4}>
                Home
              </corejam-base-link>
            </corejam-box>
            <corejam-box>
              <corejam-base-link href="/login" mr={4}>
                Login
              </corejam-base-link>
            </corejam-box>
            <corejam-box>
              <corejam-base-link href="/register" mr={4}>
                Register
              </corejam-base-link>
            </corejam-box>
            <corejam-box>
              <corejam-base-link href="/admin" mr={4}>
                Admin
              </corejam-base-link>
            </corejam-box>
          </corejam-box>
          <corejam-box flex justify="center" w={8} items="center"></corejam-box>
          <corejam-box flex w={2} direction="row-reverse">
            <corejam-identity></corejam-identity>
          </corejam-box>
        </corejam-box>
      </Host>
    );
  }
}
