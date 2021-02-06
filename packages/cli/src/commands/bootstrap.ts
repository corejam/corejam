import { getCacheDir } from "@corejam/base/dist/Bootstrap";
import chalk from "chalk";
import jetpack from "fs-jetpack";
import ora from "ora";
import { envRoot } from "../config";

export async function bootstrap(_options: any) {
  try {
    const envPackageName = require(envRoot + "/package.json").name;
    const bootSpinner = ora(`Bootstraping ${chalk.bold.green(envPackageName)}...`).start();

    const manifest = require(envRoot + "/.corejam/manifest.json") as any;
    const topLevel = manifest?.plugins[manifest?.plugins.length - 1];

    let exists = null;
    try {
      exists = require.resolve(`${topLevel}/dist/cli/Bootstrap`);
    } catch (e) {
      //Nothing
    }

    //Check if we can run any bootstrap scripts made available by packages
    if (topLevel && exists !== null) {
      const generated = await require(`${topLevel}/dist/cli/Bootstrap`).default();
      await jetpack.writeAsync(getCacheDir() + "/faker.json", JSON.stringify(generated));
    }

    bootSpinner.stopAndPersist({ text: "Finished..." });
  } catch (e) {
    console.log(e);
  }
}
