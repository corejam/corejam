import chokidar from "chokidar";
import { envRoot, stencilRunner } from "../config";
import jetpack from "fs-jetpack";
import { writeConfig } from "./generateConfig";

export async function initWatchers() {
  const removePath = async (path: string, folder: string) => {
    const relFilePath = path.replace(envRoot + "/ + folder +/", "");
    jetpack.removeAsync(stencilRunner + "/src/" + folder + "/" + relFilePath);
    await writeConfig();
  };

  const sharedWatcher = chokidar.watch(envRoot + "/shared");
  sharedWatcher.on("change", (changedFile) => {
    const relFilePath = changedFile.replace(envRoot + "/shared", "");
    jetpack.copyAsync(changedFile, stencilRunner + "/src/shared/" + relFilePath, { overwrite: true });
  });

  sharedWatcher.on("unlink", (p) => removePath(p, "shared"));
  sharedWatcher.on("unlinkDir", (p) => removePath(p, "shared"));

  const storeWatcher = chokidar.watch(envRoot + "/store");
  storeWatcher.on("change", (changedFile) => {
    const relFilePath = changedFile.replace(envRoot + "/store", "");
    jetpack.copyAsync(changedFile, stencilRunner + "/src/store/" + relFilePath, { overwrite: true });
  });

  sharedWatcher.on("unlink", (p) => removePath(p, "store"));
  sharedWatcher.on("unlinkDir", (p) => removePath(p, "store"));

  const compWatcher = chokidar.watch(envRoot + "/components");

  compWatcher.on("change", async (changedFile) => {
    const relFilePath = changedFile.replace(envRoot + "/components", "");
    jetpack.copyAsync(changedFile, stencilRunner + "/src/components/" + relFilePath, { overwrite: true });
    await writeConfig();
  });

  compWatcher.on("unlink", (p) => removePath(p, "components"));
  compWatcher.on("unlinkDir", (p) => removePath(p, "components"));

  const routesWatcher = chokidar.watch(envRoot + "/routes");

  routesWatcher.on("change", async (changedFile) => {
    const splits = changedFile.split("/");
    const nameWithoutExtension = splits[splits.length - 1].replace(".tsx", "");

    const relPath = changedFile
      .replace(envRoot + "/routes", "")
      .replace(splits[splits.length - 1], "")
      .split("/")
      .join("-");

    await jetpack.copyAsync(
      changedFile,
      `${stencilRunner}/src/components/route${relPath}${nameWithoutExtension}/${splits[splits.length - 1]}`,
      {
        overwrite: true,
      }
    );
    await writeConfig();
  });

  routesWatcher.on("unlink", (p) => removePath(p, "routes"));
  routesWatcher.on("unlinkDir", (p) => removePath(p, "routes"));
}
