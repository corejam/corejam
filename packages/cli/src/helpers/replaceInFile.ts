import replace from "replace-in-file";
import { reactBindingsRoot, stencilRunner } from "../config";
import { appendAsync } from "fs-jetpack";

export async function replaceWebComponentsImport(name: string) {
  replace.sync({
    files: reactBindingsRoot + "/dist/**/*",
    from: "@corejam/stencil-runner",
    to: name,
  });
}

export async function addEnvVars(staticBuild = false) {
  if (process.env.DEPLOYMENT_URL) {
    await appendAsync(stencilRunner + "/.env", `DEPLOYMENT_URL=${process.env.DEPLOYMENT_URL}`);
  }
  if (staticBuild) await appendAsync(stencilRunner + "/.env", `\nMODE=static`);
}