import jetpack from "fs-jetpack";
import debug from "debug";

import { envRoot, stencilRunner, testRunner, cliRoot } from "../config";

async function staticCopy() {
  await jetpack.copyAsync(envRoot + "/shared", stencilRunner + "/src/shared", { overwrite: true });
  await jetpack.copyAsync(envRoot + "/store", stencilRunner + "/src/store", { overwrite: true });
  await jetpack.copyAsync(envRoot + "/components", stencilRunner + "/src/components", { overwrite: true });
  if (await jetpack.existsAsync(envRoot + "/.env")) {
    await jetpack.copyAsync(envRoot + "/.env", stencilRunner + "/.env", { overwrite: true });
  } else {
    await jetpack.writeAsync(stencilRunner + "/.env", "");
  }
}

async function copyAndTransformRoutes() {
  const traverse = (lookupPath: string) => {
    const paths = jetpack.list(lookupPath);
    if (paths)
      paths.forEach((current) => {
        const relPath = lookupPath
          .replace(envRoot + "/routes", "")
          .split("/")
          .join("-");
        const normalizedRelPath = relPath.length > 1 ? relPath : "";
        if (current.indexOf("tsx") > -1) {
          const nameWithoutExtension = current.replace(".tsx", "");
          jetpack.copy(
            lookupPath + "/" + current,
            `${stencilRunner}/src/components/route${normalizedRelPath}-${nameWithoutExtension}/${current}`
          );
        } else {
          traverse(lookupPath + "/" + current);
        }
      });
  };
  traverse(envRoot + "/routes");
}

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

export async function bootstrapPluginToRunner() {
  await staticCopy();
  await copyAndTransformRoutes();
  await addImportsToGlobalScript();
}

/**
 * - Copy base/ to src/
 * - Copy all server code from plugin
 * - copy /tests
 */
export async function bootstrapPluginForTests() {
  await Promise.all([
    jetpack.copyAsync(cliRoot + "/../base", testRunner + "/__LINKEDPKGS__/base", { overwrite: true }),
    jetpack.copyAsync(envRoot + "/shared", testRunner + "/shared", { overwrite: true }),
    jetpack.copyAsync(envRoot + "/server", testRunner + "/server", { overwrite: true }),
    jetpack.copyAsync(envRoot + "/tests", testRunner + "/tests", { overwrite: true }),
    jetpack.copyAsync(envRoot + "/index.ts", testRunner + "/index.ts", { overwrite: true }),
  ]);
  
  if(await jetpack.existsAsync(envRoot + "/.env") !== false) {
    await jetpack.copyAsync(envRoot + "/.env", testRunner + "/.env", { overwrite: true })
  }
}
