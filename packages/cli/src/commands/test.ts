import chalk from "chalk";
import execa from "execa";
import { isYarn } from "is-npm";
import ora from "ora";
import { addTestDependencies } from "../helpers/addDependencies";
import { bootstrapPluginForTests } from "../helpers/bootstrapPluginToRunner";
import { testRunner, envRoot } from "../config";
import { copyTestRunner, copyCoverageToPlugin } from "../helpers/copy";
import { cleanActiveTestRunner } from "../helpers/resetStages";
import { replaceCoveragePaths, replaceTestingModulePaths } from "../helpers/replaceInFile";
import { corejamInit } from './init';

export async function runTest(opts: any) {
  try {
    const envPackageName = require(envRoot + "/package.json").name;

    const bootSpinner = ora(`Booting up test environment for ${chalk.bold.green(envPackageName)}...`).start();

    await cleanActiveTestRunner();
    await copyTestRunner();

    bootSpinner.text = "Initializing tests...";

    await addTestDependencies();
    await corejamInit();
    await bootstrapPluginForTests();

    await replaceTestingModulePaths()
    await execa(isYarn ? "yarn" : "npm", ["install", "--frozen-lockfile"], { cwd: testRunner });
    bootSpinner.text = "Updating dependencies...";

    bootSpinner.stopAndPersist();
    await execa("jest", ["--verbose", "--config=./jest.config.js"].concat(opts._), {
      stdio: "inherit",
      cwd: testRunner,
    });

    await copyCoverageToPlugin();
    await replaceCoveragePaths();

    await cleanActiveTestRunner();
  } catch (e) {
    await cleanActiveTestRunner();
    throw e;
  }
}

export async function runWCTests() {
  await execa("stencil", ["test", "--spec"], { stdio: "inherit", cwd: envRoot });
}
