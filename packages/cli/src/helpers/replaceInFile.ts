import replace from "replace-in-file";
import { reactBindingsRoot, stencilRunner, envRoot, testRunner } from "../config";
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

/**
 * The coverage report is built inside the test-runner directory
 * so we need to change the paths back to the plugin it came from.
 */
export async function replaceCoveragePaths() {
  replace.sync({
    files: envRoot + "/tests/.coverage/**/clover.xml",
    from: new RegExp(testRunner, "g"),
    to: envRoot,
  });
}
