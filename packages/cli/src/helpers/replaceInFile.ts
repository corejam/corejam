import replace from "replace-in-file";
import { reactBindingsRoot } from "../config";

export async function replaceWebComponentsImport(name: string) {
  replace.sync({
    files: reactBindingsRoot + "/dist/**/*",
    from: "@corejam/stencil-runner",
    to: name,
  });
}
