import jetpack from "fs-jetpack";
import { envRoot, cliRoot, reactBindingsRoot } from "../config";

export async function copyBindingsToPlugin() {
  await jetpack.copyAsync(reactBindingsRoot + "/dist", envRoot + "/react", { overwrite: true });
}

export async function copyBindings() {
  await jetpack.copyAsync(cliRoot + "/src/templates/bindings/react", reactBindingsRoot);
}

export async function copySchemaToDist() {
  if (jetpack.exists(envRoot + "/server/schema"))
    await jetpack.copyAsync(envRoot + "/server/schema", envRoot + "/dist/schema", { overwrite: true });
}
