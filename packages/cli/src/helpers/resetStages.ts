import jetpack from "fs-jetpack";
import { envRoot, stencilRunner, reactBindingsRoot, testRunner } from "../config";

async function cleanDistFilesInPlugin() {
  const files = ["/web-components", "/react", "/dist"];
  await Promise.all(files.map((f) => jetpack.removeAsync(envRoot + f)));
}

export async function cleanStencilRunnerFiles() {
  const files = [
    "/src/components",
    "/src/shared",
    "/src/store",
    "/src/config.json",
    "/dist",
    "/src/global.ts",
    "/src/plugins",
  ];
  await Promise.all(files.map((f) => jetpack.removeAsync(stencilRunner + f)));
}

async function cleanTempReactBindings() {
  await jetpack.removeAsync(reactBindingsRoot);
}

export async function cleanGeneratedFiles() {
  await cleanDistFilesInPlugin();
  await cleanStencilRunnerFiles();
  await cleanTempReactBindings();
}

export async function cleanActiveRunner() {
  await jetpack.removeAsync(stencilRunner);
}

export async function cleanActiveTestRunner() {
  await jetpack.removeAsync(testRunner);
}

export async function cleanBindings() {
  await jetpack.removeAsync(reactBindingsRoot);
}
