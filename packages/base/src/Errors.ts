export function MissingJWTHashException() {
  const error = new Error();
  error.message = "JWT_HASH not set in environment";

  return error;
}

/**
 * Generic error when we fail to load a plugin
 */
export class PluginLoadError extends Error {
  constructor(plugin: string, e: Error) {
    if (plugin[0] === "/") {
      plugin = `Local Plugin: ${plugin}`;
    }
    super(`${plugin} failed to load >>> ${e.message}`);
    this.name = "PluginLoadError" + e.name;
    this.stack += e.stack ? e.stack : "";
  }
}
