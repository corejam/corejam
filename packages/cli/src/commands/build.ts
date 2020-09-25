import chalk from "chalk";
import ora from "ora";
import execa from "execa";
import jetpack from "fs-jetpack";
import { isYarn } from "is-npm";
import kill from "kill-port";
import { stencilRunner, reactBindingsRoot, envRoot } from "../config";
import { cleanBindings } from "../helpers/resetStages";
import { copyBindings, copyBindingsToPlugin, copySchemaToDist } from "../helpers/copy";
import { prependNoCheckToComponents } from "../helpers/prependInFile";
import { replaceWebComponentsImport } from "../helpers/replaceInFile";

export default async function run(options: any) {
  return new Promise(async (res, rej) => {
    try {
      const envPackageName = require(envRoot + "/package.json").name;

      const bootSpinner = ora(`Starting build for ${chalk.bold.green(envPackageName)}...`).start();

      const logToConsole = options.l ? "inherit" : "ignore";

      bootSpinner.text = "Bundling server code";
      await buildServerCode();
      bootSpinner.text = "Bundling server code finished";
      bootSpinner.text = "Finished server build";

      await cleanBindings();

      await copyBindings();

      bootSpinner.text = "Generating web components build";

      await kill(3001);

      await execa("stencil", ["build", "--docs"], {
        stdio: logToConsole,
        cwd: envRoot,
        env: {
          mode: "prod",
          targets: "dist,custom,hydrate,react",
        },
      });

      if (!options.wc) {
        bootSpinner.text = "Install react bindings dependencies";

        await prependNoCheckToComponents();

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

      await cleanBindings();
      bootSpinner.succeed("Finished plugin build");
      res();
    } catch (e) {
      await cleanBindings();
      console.log(e);
      rej();
    }
  });
}

export async function buildStatic(options: any) {
  const envPackageName = require(envRoot + "/package.json").name;

  const bootSpinner = ora(`Starting static build for ${chalk.bold.green(envPackageName)}...`).start();

  const api = execa("corejam", ["api:serve"], { stdio: "ignore", cwd: envRoot });

  isYarn
    ? await execa("yarn", ["install", "--frozen-lockfile"], { cwd: stencilRunner })
    : await execa("npm", ["ci"], { cwd: stencilRunner });

  bootSpinner.text = "Updating dependencies...";

  bootSpinner.text = "Plugin dependencies installed";

  // await renameHtmlImports();
  bootSpinner.text = "Generating static files";

  // await removePlaygroundFiles();

  // await replaceRouterImport(true);

  await execa("stencil", ["build", "--docs", "--prerender"], {
    cwd: stencilRunner,
    stdio: options.log ? "inherit" : "ignore",
  });

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
