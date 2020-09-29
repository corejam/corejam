import execa from "execa";
import chokidar from "chokidar";
import { isYarn } from "is-npm";
import chalk from "chalk";
import ora from "ora";
import jetpack from "fs-jetpack";
import kill from "kill-port";
import { envRoot } from "../config";
import { copySchemaToDist } from "../helpers/copy";
import { cleanActiveRunner } from "../helpers/resetStages";
import { set, get } from "../processes";

export default async function run(options: any) {
  try {
    const envPackageName = require(envRoot + "/package.json").name;

    const bootSpinner = ora(`Booting up dev environment for ${chalk.bold.green(envPackageName)}...`).start();

    const logToConsole = options.l ? "inherit" : "ignore";

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
          ignored: "*.d.ts"
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

    bootSpinner.text = "Booting stencil...";

    await kill(3001);

    set(
      "stencil",
      execa("stencil", ["build", "--dev", "--watch", "--serve", "--docs"], {
        stdio: logToConsole,
        cwd: envRoot,
        env: {
          ...process.env,
          NODE_ENV: process.env.NODE_ENV || "development"
        }
      })
    );

    bootSpinner.stopAndPersist({ text: "Watching for file change..." });
  } catch (e) {
    await cleanActiveRunner();
    console.log(e);
  }
}
