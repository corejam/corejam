import { Component, ComponentInterface, Listen } from "@stencil/core";
import { serialize } from "../../shared/utils/utils";
@Component({
  tag: "dershop-serializer",
  styleUrl: "dershop-serializer.css",
})
export class DershopSerializer implements ComponentInterface {
  @Listen("keydown", { target: "document" })
  serializeTree(e: KeyboardEvent) {
    if (e.key === "s") {
      const node = prompt("Please enter node name");
      serialize(node);
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
