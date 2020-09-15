import { replaceInFile } from "replace-in-file";
import { stencilRunner, envRoot } from "../config";
import debug from "debug";

export async function renameStencilToProjectName() {
  const pkgJson = require(envRoot + "/package.json");
  try {
    await replaceInFile({
      files: stencilRunner + "/stencil.config.ts",
      from: "corejam_dev_mapping",
      to: pkgJson.name.replace("@", "").replace("/", "-"),
    });
  } catch (e) {
    debug(e);
  }
}

export async function resetStencilName() {
  const pkgJson = require(envRoot + "/package.json");
  try {
    await replaceInFile({
      files: stencilRunner + "/stencil.config.ts",
      from: pkgJson.name.replace("@", "").replace("/", "-"),
      to: "corejam_dev_mapping",
    });
  } catch (e) {
    debug(e);
  }
}

export async function renameHtmlImports() {
  const pkgJson = require(envRoot + "/package.json");
  try {
    await replaceInFile({
      files: stencilRunner + "/src/index.html",
      from: "corejam_dev_mapping",
      to: pkgJson.name.replace("@", "").replace("/", "-"),
    });
  } catch (e) {
    debug(e);
  }
}
