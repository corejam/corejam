//@ts-ignore
import prepend from "prepend";
import path from "path";
import { reactBindingsRoot } from "../config";

export async function prependNoCheckToComponents() {
  return new Promise((res) => {
    const file = path.resolve(reactBindingsRoot, "src", "components.ts");
    prepend(file, "//@ts-nocheck", (err: any) => {
      if (err) throw Error(err);
      res();
    });
  });
}
