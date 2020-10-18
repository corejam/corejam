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

    // Set the prototype explicitly. This is a TS limitation
    // https://github.com/facebook/jest/issues/8279#issuecomment-539775425
    Object.setPrototypeOf(this, PluginLoadError.prototype);
  }
}
