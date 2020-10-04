import * as path from "path";
import { PluginLoadError } from "./Errors";
import { PluginManifest } from "./typings/Plugin";
import { fetchStaticFile } from "./Server";
import { IntrospectionResult } from "./typings/Server";

let introspection: IntrospectionResult;

/**
 * Check if we are currently a plugin that needs to load server side code.
 * If packageName is provided we check that.
 *
 * Otherwise we default to checking current process.cwd if we are inside a package.
 */
export function isAPlugin(packageName?: string) {
  try {
    if (!packageName) {
      packageName = process.cwd();
    }

    const packageJson = require(packageName + "/package.json") as Object;
    if (!Object.prototype.hasOwnProperty.call(packageJson, "corejam")) return false;

    let hasServerDir = false;

    if (process.env.NODE_ENV === "test") hasServerDir = typeof require.resolve(`${packageName}/server/`) === "string";
    else {
      hasServerDir = typeof require.resolve(`${packageName}/dist/server/`) === "string";
    }

    return hasServerDir ? true : false;
  } catch (e) {
    return false;
  }
}

/**
 * Collect all corejam plugins that are currently active
 * so we can bootstrap them individually.
 *
 * @param path
 */
export function collectPlugins(path = process.cwd()): Array<string> {
  const packageJson = require(path + "/package.json");
  const deps = packageJson.dependencies ? Object.keys(packageJson.dependencies) : [];
  const devDeps = packageJson.devDependencies ? Object.keys(packageJson.devDependencies) : [];

  const plugins: Array<string> = [];
  //Check all the dependencies
  [...deps, ...devDeps].forEach((key) => {
    if (isAPlugin(key)) {
      plugins.push(key);
    }
  });

  return plugins;
}

/**
 * Imports a plugin while taking into consideration
 * different contexts it could be launched in.
 *
 * (Production, Inside plugin, testing)
 *
 * @param plugin
 */
export async function importPlugin(plugin: string) {
  try {
    if (plugin[0] === "/") {
      let pluginPath;

      //If we are testing we want to go directly to src/ instead
      if (process.env.NODE_ENV === "test") {
        pluginPath = path.resolve(plugin, "server/index.ts");
      } else {
        pluginPath = path.resolve(plugin, "dist/server/index.js");
      }

      return await import(pluginPath);
    } else {
      if (process.env.NODE_ENV === "test") {
        plugin = `${plugin}/server/index.ts`;
      }

      return await import(plugin);
    }
  } catch (e) {
    throw new PluginLoadError(plugin, e);
  }
}

/**
 * Load the manifest file from cache
 */
export function loadManifest(): Promise<PluginManifest> {
  return fetchStaticFile("manifest.json");
}

/**
 * Collect the schema from each corejam plugin so we can load it
 * and get a cacheable introspection result that we store to reduce future
 * requests having to build it again.
 */
export async function bootstrapSchema(): Promise<IntrospectionResult> {
  if (introspection) return introspection;

  //Check do we have a hoisted schema
  return (introspection = ((await fetchStaticFile("schema.json")) as unknown) as IntrospectionResult);
}
