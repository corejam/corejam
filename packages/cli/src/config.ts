import path from "path";
import os from "os";

export const envRoot = process.cwd();
const pkgJon = require(envRoot + "/package.json");

// dummy check
const mono = pkgJon.name.indexOf("@corejam") > -1;

const rootPath = mono ? "../.." : os.tmpdir();

export const cliRoot = path.join(__dirname, "..");
export const stencilRunner = path.resolve(rootPath, "stencil-runner");
export const testRunner = path.resolve(rootPath, "test-runner");
export const reactBindingsRoot = path.resolve(rootPath, "react-bindings");
