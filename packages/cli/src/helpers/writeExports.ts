import jetpack from "fs-jetpack";
import { envRoot, stencilRunner } from "../config";
import { replaceInFile } from "replace-in-file";
import debug from "debug";

export async function writeExposedObjectsToIndex() {
  const stores = await jetpack.listAsync(`${envRoot}/store`);

  const data = ['export { Components, JSX } from "./components";'];

  stores?.forEach((store) => {
    data.push('export * from "./store/' + store.replace(".ts", "") + '";');
  });

  await jetpack.writeAsync(`${stencilRunner}/src/index.ts`, data.join("\n"));
}

export async function replaceRouterImport(staticBuild = false) {
  const pkgJson = require(envRoot + "/package.json");
  const str = pkgJson.name.indexOf("core-components") > -1 ? "./store/core" : "@corejam/core-components";
  try {
    await replaceInFile({
      files: stencilRunner + `/src/${staticBuild ? "StaticRouter.tsx" : "Router.tsx"}`,
      from: "##Router##",
      to: `import { routerState } from "${str}"`,
    });
  } catch (e) {
    debug(e);
  }
}
