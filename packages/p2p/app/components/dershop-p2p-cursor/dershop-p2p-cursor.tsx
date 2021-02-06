//@ts-nocheck
import { Component, h, Listen, State } from "@stencil/core";

@Component({
  tag: "dershop-p2p-cursor",
})
export class DershopP2pCursor {
  @State() style: any = { position: "fixed" };

  @Listen("p2pReceivedData", { target: "document" })
  receivedP2PCursors(e: CustomEvent) {
    if (e.detail.receiver === "Cursor") {
      const cursor = e.detail.cursor;
      this.style = {
        ...this.style,
        left: (window.innerWidth / cursor.width) * cursor.x + "px",
        top: (window.innerHeight / cursor.height) * cursor.y + "px",
      };
    }
    if (e.detail.receiver === "CursorMousedown") {
      this.style = {
        ...this.style,
        filter: "invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%)",
      };
    }
    if (e.detail.receiver === "CursorMouseup") {
      this.style = {
        ...this.style,
        filter: "",
      };
    }
  }
  render() {
    if (this.style.top)
      return (
        <svg
          style={{ ...this.style }}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10 9C11.6569 9 13 7.65685 13 6C13 4.34315 11.6569 3 10 3C8.34315 3 7 4.34315 7 6C7 7.65685 8.34315 9 10 9ZM3 18C3 14.134 6.13401 11 10 11C13.866 11 17 14.134 17 18H3Z"
            fill="#4A5568"
          />
        </svg>
      );
    return "";
  }
}
