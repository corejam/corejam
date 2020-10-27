import jetpack from "fs-jetpack";
import { envRoot, reactBindingsRoot } from "../config";

async function cleanDistFilesInPlugin() {
  const files = ["/web-components", "/react", "/dist"];
  await Promise.all(files.map((f) => jetpack.removeAsync(envRoot + f)));
}

async function cleanTempReactBindings() {
  await jetpack.removeAsync(reactBindingsRoot);
}

export async function cleanGeneratedFiles() {
  await cleanDistFilesInPlugin();
  await cleanTempReactBindings();
}

export async function cleanBindings() {
  await jetpack.removeAsync(reactBindingsRoot);
}
