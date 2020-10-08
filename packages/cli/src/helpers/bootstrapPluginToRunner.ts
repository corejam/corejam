import jetpack from "fs-jetpack";
import debug from "debug";

import { envRoot, stencilRunner, testRunner, cliRoot } from "../config";

function collectGlobalsImports(): string[] {
  const pkgJson = require(envRoot + "/package.json");

  if (pkgJson.corejam && pkgJson.corejam.external) {
    return pkgJson.corejam.external;
  }
  return [];
}

export async function addImportsToGlobalScript() {
  await jetpack.removeAsync(stencilRunner + "/src/global.ts");

  const data = collectGlobalsImports()
    .map((dep: string) => {
      if (dep.includes("corejam")) return `import "${dep}/web-components"`;
      return `import "${dep}"`;
    })
    .join("\n");

  if (data) {
    debug(`External deps: ${data.toString()}`);
    await jetpack.writeAsync(stencilRunner + "/src/global.ts", data);
  }
}


/**
 * - Copy base/ to src/
 * - Copy all server code from plugin
 * - copy /tests
 */
export async function bootstrapPluginForTests() {
  await Promise.all([
    jetpack.copyAsync(cliRoot + "/../base", testRunner + "/__LINKEDPKGS__/base", { overwrite: true }),
    jetpack.copyAsync(envRoot + "/.corejam", testRunner + "/.corejam", { overwrite: true }),
    jetpack.copyAsync(envRoot + "/shared", testRunner + "/shared", { overwrite: true }),
    jetpack.copyAsync(envRoot + "/server", testRunner + "/server", { overwrite: true }),
    jetpack.copyAsync(envRoot + "/tests", testRunner + "/tests", { overwrite: true }),
    jetpack.copyAsync(envRoot + "/index.ts", testRunner + "/index.ts", { overwrite: true }),
  ]);

  if (await jetpack.existsAsync(envRoot + "/.env") !== false) {
    await jetpack.copyAsync(envRoot + "/.env", testRunner + "/.env", { overwrite: true })
  }
}
