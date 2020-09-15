import jetpack from "fs-jetpack";
import { envRoot, stencilRunner, testRunner } from "../config";

export async function addDependencies() {
  const pluginPackage = require(envRoot + "/package.json");
  const runnerPackage = require(stencilRunner + "/package.json");

  const newPackage = Object.assign({}, runnerPackage);
  newPackage.devDependencies = {
    ...pluginPackage.devDependencies,
    ...pluginPackage.dependencies,
    ...runnerPackage.devDependencies,
  };
  await jetpack.writeAsync(stencilRunner + "/package.json", newPackage);
}

export async function addTestDependencies() {
  const pluginPackage = require(envRoot + "/package.json");
  const runnerPackage = require(testRunner + "/package.json");

  const newPackage = Object.assign({}, runnerPackage);
  newPackage.devDependencies = {
    ...pluginPackage.devDependencies,
    ...pluginPackage.dependencies,
    ...runnerPackage.devDependencies,
  };
  await jetpack.writeAsync(testRunner + "/package.json", newPackage);
}
