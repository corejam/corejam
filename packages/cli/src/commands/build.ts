import chalk from "chalk";
import ora from "ora";
import execa from "execa";
import jetpack from "fs-jetpack";
import { isYarn } from "is-npm";
import kill from "kill-port";
import { stencilRunner, reactBindingsRoot, envRoot } from "../config";
import { cleanBindings } from "../helpers/resetStages";
import { bootstrapPluginToRunner } from "../helpers/bootstrapPluginToRunner";
import { addDependencies } from "../helpers/addDependencies";
import { renameStencilToProjectName, renameHtmlImports } from "../helpers/renameStencilProject";
import { deleteDevFiles, removePlaygroundFiles } from "../helpers/modifyStencilEnv";
import {
  copyStencilDistToPlugin,
  copyBindings,
  copyBindingsToPlugin,
  copySchemaToDist,
  copyStaticToPlugin,
} from "../helpers/copy";
import { copyStencilRunner } from "../helpers/copy";
import { cleanActiveRunner } from "../helpers/resetStages";
import { prependNoCheckToComponents } from "../helpers/prependInFile";
import { replaceWebComponentsImport, addEnvVars } from "../helpers/replaceInFile";
import { prependImports } from "../helpers/modifyGlobal";
import { getDependencies } from "../helpers/dependencies";
import { writeConfig } from "../helpers/generateConfig";
import { writeExposedObjectsToIndex, replaceRouterImport } from "../helpers/writeExports";

export default async function run(options: any) {
  return new Promise(async (res, rej) => {
    try {
      const envPackageName = require(envRoot + "/package.json").name;

      const bootSpinner = ora(`Starting build for ${chalk.bold.green(envPackageName)}...`).start();

      const logToConsole = options.l ? "inherit" : "ignore";

      if (options.server) {
        bootSpinner.text = "Bundling server code";
        await buildServerCode();
        bootSpinner.text = "Bundling server code finished";
        bootSpinner.succeed("Finished server build");
        return res();
      }

      await cleanActiveRunner();
      await cleanBindings();

      await copyStencilRunner();
      await copyBindings();

      bootSpinner.text = "Copying plugin data to build environment";
      await bootstrapPluginToRunner();

      await addEnvVars();

      bootSpinner.text = "Copied all relevant plugin data";

      bootSpinner.text = "Add plugin dependencies and install";
      await addDependencies();

      await execa(isYarn ? "yarn" : "npm", ["install", "--frozen-lockfile"], {
        cwd: stencilRunner,
        stdio: logToConsole,
      });
      bootSpinner.text = "Updating dependencies...";

      bootSpinner.text = "Plugin dependencies installed";

      await renameStencilToProjectName();

      bootSpinner.text = "Generating web components build";

      await deleteDevFiles();

      const deps = await getDependencies();

      await prependImports(deps);
      await writeExposedObjectsToIndex();

      await kill(3001);

      await execa(isYarn ? "yarn" : "npm", [isYarn ? "gen" : "run", isYarn ? "" : "gen"], {
        cwd: stencilRunner,
        stdio: logToConsole,
      });

      bootSpinner.text = "Web components build finished";

      await copyStencilDistToPlugin();

      if (!options.wc) {
        bootSpinner.text = "Install react bindings dependencies";

        await prependNoCheckToComponents();

        await execa(isYarn ? "yarn" : "npm", ["install", "--frozen-lockfile"], {
          cwd: reactBindingsRoot,
          stdio: logToConsole,
        });

        bootSpinner.text = "Generating react bindings";

        await execa(isYarn ? "yarn" : "npm", ["build"], { cwd: reactBindingsRoot, stdio: logToConsole });

        bootSpinner.text = "React bindings finished";

        await replaceWebComponentsImport(envPackageName);

        await copyBindingsToPlugin();

        if (jetpack.exists(envRoot + "/server")) {
          bootSpinner.text = "Bundling server code";
          buildServerCode();
          bootSpinner.text = "Bundling server code finished";
        }
      }

      await cleanActiveRunner();
      await cleanBindings();
      bootSpinner.succeed("Finished plugin build");
      res();
    } catch (e) {
      await cleanActiveRunner();
      await cleanBindings();
      console.log(e);
      rej();
    }
  });
}

export async function buildStatic(options: any) {
  const envPackageName = require(envRoot + "/package.json").name;

  await cleanActiveRunner();
  await cleanBindings();

  await copyStencilRunner();
  await copyBindings();

  const bootSpinner = ora(`Starting static build for ${chalk.bold.green(envPackageName)}...`).start();

  await bootstrapPluginToRunner();

  await addEnvVars(true);

  await writeConfig();

  bootSpinner.text = "Copied all relevant plugin data";

  bootSpinner.text = "Add plugin dependencies and install";
  await addDependencies();

  const api = execa("corejam", ["api:serve"], { stdio: "ignore", cwd: envRoot });

  await execa(isYarn ? "yarn" : "npm", ["install"], { cwd: stencilRunner });
  bootSpinner.text = "Updating dependencies...";

  bootSpinner.text = "Plugin dependencies installed";

  await renameStencilToProjectName();

  await renameHtmlImports();
  bootSpinner.text = "Generating static files";

  await removePlaygroundFiles();

  await replaceRouterImport(true);

  const deps = await getDependencies();

  await prependImports(deps);

  await writeExposedObjectsToIndex();

  await execa("stencil", ["build", "--docs", "--prerender"], {
    cwd: stencilRunner,
    stdio: options.log ? "inherit" : "ignore",
  });

  await copyStaticToPlugin();
  await cleanActiveRunner();
  await cleanBindings();

  api.kill();

  bootSpinner.succeed("Finished static build");
}

async function buildServerCode() {
  if (jetpack.exists(envRoot + "/server")) {
    await copySchemaToDist();

    await execa("tsc", ["-p", "tsconfig-mjs.json"], { cwd: envRoot });
    await execa("tsc", ["-p", "tsconfig-cjs.json"], { cwd: envRoot });
  }
}
