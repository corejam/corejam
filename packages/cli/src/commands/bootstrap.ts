import { getCacheDir } from '@corejam/base/dist/Bootstrap';
import chalk from "chalk";
import jetpack from 'fs-jetpack';
import ora from "ora";
import { envRoot } from '../config';

export async function bootstrap(_options: any) {
  try {
    const envPackageName = require(envRoot + "/package.json").name;
    const bootSpinner = ora(`Bootstraping ${chalk.bold.green(envPackageName)}...`).start();

    const manifest = require(envRoot + "/.corejam/manifest.json") as any;
    const topLevel = manifest?.plugins[manifest?.plugins.length - 1];

    const generated = await require(`${topLevel}/dist/cli/Bootstrap`).default()

    await jetpack.writeAsync(getCacheDir() + "/faker.json", JSON.stringify(generated))

    bootSpinner.stopAndPersist({ text: "Finished..." });
  } catch (e) {
    console.log(e);
  }
}
