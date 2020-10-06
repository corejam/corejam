import path from "path";
import os from "os";

let mono = false;
try {
  const packageJson = require(process.cwd() + "/package.json")
  if (Object.keys(packageJson).includes("workspaces")) {
    mono = true;
  }
}
catch (e) { }

const rootPath = mono ? ".." : os.tmpdir();

export const envRoot = process.cwd();
export const cliRoot = path.join(__dirname, "..");
export const stencilRunner = path.resolve(rootPath, "stencil-runner");
export const testRunner = path.resolve(rootPath, "test-runner");
export const reactBindingsRoot = path.resolve(rootPath, "react-bindings");

/*
console.log("cwd", process.cwd())
console.log("mono", mono)
console.log("rootPath", rootPath)
console.log("envRoot", envRoot)
console.log("cliRoot", cliRoot)
console.log("stencilRunner", stencilRunner)
console.log("testRunner", testRunner)
console.log("reactBindingsRoot", reactBindingsRoot) */