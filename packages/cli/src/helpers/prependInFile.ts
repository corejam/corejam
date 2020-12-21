//@ts-ignore
import prepend from "prepend";
import path from "path";
import { envRoot } from "../config";

export async function prependNoCheckToComponents() {
  return new Promise<void>((res) => {
    const file = path.resolve(envRoot, "react", "index.ts");
    prepend(file, "//@ts-nocheck", (err: any) => {
      if (err) throw Error(err);
      res();
    });
  });
}
