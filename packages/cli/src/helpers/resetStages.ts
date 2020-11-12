import jetpack from "fs-jetpack";
import { envRoot } from "../config";

async function cleanDistFilesInPlugin() {
  const files = ["/web-components", "/react", "/dist"];
  await Promise.all(files.map((f) => jetpack.removeAsync(envRoot + f)));
}

export async function cleanGeneratedFiles() {
  await cleanDistFilesInPlugin();
}
