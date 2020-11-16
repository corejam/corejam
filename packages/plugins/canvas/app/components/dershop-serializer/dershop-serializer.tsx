import { Component, ComponentInterface, Listen } from "@stencil/core";
import { serialize } from "../../utils/utils";
@Component({
  tag: "dershop-serializer",
  styleUrl: "dershop-serializer.css",
})
export class DershopSerializer implements ComponentInterface {
  @Listen("keydown", { target: "document" })
  serializeTree(e: KeyboardEvent) {
    if (e.key === "s") {
      serialize();
    }
  }

  @Listen("serializedCanvas", { target: "document" })
  serializedCanvas(e) {
    console.log(e.detail);
  }

  render() {
    return "";
  }
}
