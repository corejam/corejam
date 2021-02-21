import * as fs from "fs";
import * as path from "path";
import { PluginLoadError } from "./Errors";
import { CorejamApplication } from "./typings/Application";
import { PluginManifest } from "./typings/Plugin";

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
export function importPlugin(plugin: string) {
  try {
    if (plugin[0] === "/") {
      let pluginPath;

      //If we are testing we want to go directly to src/ instead
      if (process.env.NODE_ENV === "test") {
        pluginPath = path.resolve(plugin, "server/index.ts");
      } else {
        pluginPath = path.resolve(plugin, "dist/server/index.js");
      }

      return require(pluginPath);
    } else {
      if (process.env.NODE_ENV === "test") {
        plugin = `${plugin}/server/index.ts`;
      }

      return require(plugin);
    }
  } catch (e) {
    throw new PluginLoadError(plugin, e);
  }
}

/**
 * Load the manifest file from cache
 */
export function loadManifest(): PluginManifest {
  return require(getCacheDir() + "/manifest.json");
}

let schema: string;

/**
 * Collect the schemas from each plugin and write it out to one large schema.
 * Doing it this way temporarily due to us loosing caching functionality using
 * executableSchema()
 */
export function bootstrapSchema(hoisted = false): string {
  if (schema) return schema; //We already have it

  /**
   * In cases like next.js we cant include extra files into our lambdas.
   * We need to hoist the schema into the root of the project for it to be readable.
   */
  const hoistedSchema = fs.existsSync(process.cwd() + "/schema.graphql")
    ? fs.readFileSync(process.cwd() + "/schema.graphql", "utf-8")
    : false;
  if (hoistedSchema) return (schema = hoistedSchema);

  let cacheDir = getCacheDir();

  if (hoisted) {
    cacheDir = process.cwd();
  }

  const schemaCachePath = path.join(cacheDir, "schema.graphql");
  if (fs.existsSync(schemaCachePath) && process.env.NODE_ENV === "production") {
    return fs.readFileSync(schemaCachePath, "utf-8");
  }

  const corePath = path.resolve(__dirname, "../utils/core.graphql");
  let mergedSchemas = fs.readFileSync(corePath, "utf-8");

  //Merge all schemas provided by packages into one
  for (const plugin of loadManifest().plugins) {
    const isLocalPlugin = isAPlugin();
    const currentPlugin = importPlugin(plugin) as CorejamApplication;

    console.log(plugin, currentPlugin)

    currentPlugin.schemas?.forEach((schema: any) => {
      const schemaRootPath = isLocalPlugin
        ? plugin
        : require.resolve(plugin).replace("/dist/server/index.js", "").replace("/server/index.ts", "");

      let schemaPath = schemaRootPath + "/dist/schema/" + schema + ".graphql";
      if (process.env.NODE_ENV === "test") {
        schemaPath = schemaRootPath + "/server/schema/" + schema + ".graphql";
      }

      const schemaFile = require.resolve(schemaPath);
      mergedSchemas += fs.readFileSync(schemaFile, "utf-8");
    });
  }

  fs.writeFileSync(schemaCachePath, mergedSchemas, "utf8");

  return mergedSchemas;
}

/**
 * Get the current cache dir, create it if needed
 */
export function getCacheDir(): string {
  const cacheDir = path.join(process.cwd(), ".corejam");

  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir);
  }

  return cacheDir;
}
