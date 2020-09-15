import jetpack from "fs-jetpack";
import path from "path";
import { stencilRunner, envRoot, cliRoot, reactBindingsRoot, testRunner } from "../config";

export async function copyStencilDistToPlugin() {
  await jetpack.copyAsync(stencilRunner + "/dist", envRoot + "/web-components", { overwrite: true });
}
export async function copyBindingsToPlugin() {
  await jetpack.copyAsync(reactBindingsRoot + "/dist", envRoot + "/react", { overwrite: true });
}

export async function copeStencilTemplatesBack() {
  await jetpack.copyAsync(path.join(__dirname, "..", "src/templates/stencil/App.tsx"), stencilRunner);
  await jetpack.copyAsync(
    path.join(__dirname, "..", "src/templates/stencil/Welcome.tsx"),
    stencilRunner + "/src/Welcome.tsx"
  );
  await jetpack.copyAsync(
    path.join(__dirname, "..", "src/templates/stencil/Router.tsx"),
    stencilRunner + "/src/Router.tsx"
  );
}

export async function copyStencilRunner() {
  await jetpack.copyAsync(path.resolve(cliRoot, "dist", "templates", "runner", "stencil"), stencilRunner);
}
export async function copyTestRunner() {
  await jetpack.copyAsync(cliRoot + "/src/templates/runner/test", testRunner);
}
export async function copyBindings() {
  await jetpack.copyAsync(cliRoot + "/src/templates/bindings/react", reactBindingsRoot);
}

export async function copySchemaToDist() {
  if (jetpack.exists(envRoot + "/server/schema"))
    await jetpack.copyAsync(envRoot + "/server/schema", envRoot + "/dist/schema", { overwrite: true });
}

export async function copyCoverageToPlugin() {
  await jetpack.copyAsync(testRunner + "/tests/.coverage", envRoot + "/tests/.coverage", { overwrite: true });
}

export async function copyStaticToPlugin() {
  await jetpack.copyAsync(stencilRunner + "/www", envRoot + "/static", { overwrite: true });
}
