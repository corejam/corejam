import jetpack from "fs-jetpack";
import { envRoot } from "../config";

export async function copySchemaToDist() {
  if (jetpack.exists(envRoot + "/server/schema"))
    await jetpack.copyAsync(envRoot + "/server/schema", envRoot + "/dist/schema", { overwrite: true });
}
