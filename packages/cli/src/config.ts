import path from "path";
import os from "os";
import execa from "execa";

let mono = true;

function monoCheck() {
  try {
    execa.sync("yarn", ["workspaces", "info"]);
  } catch (e) {
    mono = false;
  }
}
monoCheck()

/**
 * If we are inside our mono repo for dev purpose we want the build packages
 * to be created under <lernaRoot>/packages 
 */
const rootPath = mono ? path.resolve(__dirname + "/../../") : os.tmpdir();

export const envRoot = mono ? process.cwd() : process.env.INIT_CWD as string;
export const cliRoot = path.join(__dirname, "..");
export const stencilRunner = path.resolve(rootPath, "stencil-runner");
export const testRunner = path.resolve(rootPath, "test-runner");
export const reactBindingsRoot = path.resolve(rootPath, "react-bindings");