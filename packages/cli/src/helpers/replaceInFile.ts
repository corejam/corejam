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
  if (process.env.API_ORIGIN) {
    await appendAsync(stencilRunner + "/.env", `API_ORIGIN=${process.env.API_ORIGIN}`);
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

/**
 * Replace the paths to test runner for the generated plugins inside the 
 * runner manifest
 */
export async function replaceTestingModulePaths() {
  replace.sync({
    files: testRunner + "/.corejam/manifest.json",
    from: envRoot,
    to: testRunner,
  });
}