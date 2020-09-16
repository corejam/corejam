import execa from "execa";
import chokidar from "chokidar";
import { isYarn } from "is-npm";
import chalk from "chalk";
import ora from "ora";
import jetpack from "fs-jetpack";
import kill from "kill-port";
import { stencilRunner, envRoot } from "../config";
import { copyStencilRunner, copySchemaToDist } from "../helpers/copy";
import { cleanActiveRunner } from "../helpers/resetStages";
import { addDependencies } from "../helpers/addDependencies";
import { bootstrapPluginToRunner } from "../helpers/bootstrapPluginToRunner";
import { writeConfig } from "../helpers/generateConfig";
import { initWatchers } from "../helpers/watch";
import { hasCache, extractCache, cache } from "../helpers/archiveNodeModules";
import { addEnvVars } from "../helpers/replaceInFile";
import { writeExposedObjectsToIndex, replaceRouterImport } from "../helpers/writeExports";
import { removeStaticFiles } from "../helpers/modifyStencilEnv";
import { set, get } from "../processes";

export default async function run(options: any) {
  try {
    const envPackageName = require(envRoot + "/package.json").name;

    const bootSpinner = ora(`Booting up dev environment for ${chalk.bold.green(envPackageName)}...`).start();

    const logToConsole = options.l ? "inherit" : "ignore";

    await cleanActiveRunner();
    await copyStencilRunner();
    await addEnvVars();
    jetpack.removeAsync(envRoot + "/.corejam");

    if (await jetpack.existsAsync(envRoot + "/server")) {
      await copySchemaToDist();

      isYarn
        ? set("server", execa("yarn", ["tsc", "-p", "tsconfig-cjs.json", "-w"], { stdio: logToConsole, cwd: envRoot }))
        : set(
            "server",
            execa("node_modules/.bin/tsc", ["-p", "tsconfig-cjs.json", "-w"], { stdio: logToConsole, cwd: envRoot })
          );
      set("api", execa("corejam", ["api:serve"], { stdio: logToConsole, cwd: envRoot }));

      setTimeout(() => {
        const watcher = chokidar.watch(envRoot + "/server", {
          ignored: "*.d.ts",
        });
        watcher.on("change", () => {
          const api = get("api");
          if (api) api.kill();
          jetpack.removeAsync(envRoot + "/.corejam");
          set("api", execa("corejam", ["api:serve"], { stdio: logToConsole, cwd: envRoot }));
        });
      }, 8000);
    } else {
      set("api", execa("corejam", ["api:serve"], { stdio: logToConsole, cwd: envRoot }));
    }

    bootSpinner.text = "Initializing runner...";

    await addDependencies();
    await bootstrapPluginToRunner();

    if (await hasCache()) {
      bootSpinner.text = "Extracting cache...";
      await extractCache();
    } else {
      isYarn
        ? await execa("yarn", ["install", "--frozen-lockfile"], { cwd: stencilRunner })
        : await execa("npm", ["ci"], { cwd: stencilRunner });
      bootSpinner.text = "Updating dependencies...";
      await cache();
    }

    bootSpinner.text = "Writing config...";

    await writeConfig();

    bootSpinner.text = "Booting stencil...";

    await writeExposedObjectsToIndex();
    await removeStaticFiles();
    await replaceRouterImport();

    await kill(3001);

    set(
      "stencil",
      execa("stencil", ["build", "--dev", "--watch", "--serve", "--docs"], {
        stdio: logToConsole,
        cwd: stencilRunner,
      })
    );

    bootSpinner.stopAndPersist({ text: "Watching for file change..." });

    initWatchers();
  } catch (e) {
    await cleanActiveRunner();
    console.log(e);
  }
}
