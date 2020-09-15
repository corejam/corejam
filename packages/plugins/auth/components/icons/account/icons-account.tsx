import { Component, ComponentInterface, h } from "@stencil/core";

@Component({
  tag: "corejam-icons-account",
  shadow: true,
})
export class IconsAccount implements ComponentInterface {
  render() {
    return (
      <svg class="self-end" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <path
          class="heroicon-ui"
          d="M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm9 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v2z"
        />
      </svg>
    );
  }
}
