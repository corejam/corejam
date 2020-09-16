import path from "path";
import os from "os";
import execa from "execa";

let mono = true;

async function monoCheck() {
  try {
    await execa("yarn", ["workspaces", "info"]);
  } catch (e) {
    mono = false;
  }
}

monoCheck();

const rootPath = mono ? "../.." : os.tmpdir();

export const envRoot = process.cwd();
export const cliRoot = path.join(__dirname, "..");
export const stencilRunner = path.resolve(rootPath, "stencil-runner");
export const testRunner = path.resolve(rootPath, "test-runner");
export const reactBindingsRoot = path.resolve(rootPath, "react-bindings");
