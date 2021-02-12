import chalk from "chalk";
import chokidar from "chokidar";
import execa from "execa";
import jetpack from "fs-jetpack";
import { isYarn } from "is-npm";
import kill from "kill-port";
import ora from "ora";
import { envRoot } from "../config";
import { copySchemaToDist } from "../helpers/copy";
import { get, kill as killProcess, set } from "../processes";
import { corejamInit } from "./init";

export default async function run(options: any) {
  try {
    const envPackageName = require(envRoot + "/package.json").name;

    const bootSpinner = ora(`Booting up dev environment for ${chalk.bold.green(envPackageName)}...`).start();

    const logToConsole = options.l ? "inherit" : "ignore";

    await jetpack.removeAsync(envRoot + "/.corejam");

    if (await jetpack.existsAsync(envRoot + "/server")) {
      await copySchemaToDist();

      isYarn
        ? await execa("yarn", ["tsc", "-p", "tsconfig-cjs.json"], { stdio: logToConsole, cwd: envRoot })
        : await execa("node_modules/.bin/tsc", ["-p", "tsconfig-cjs.json", "-w"], {
            stdio: logToConsole,
            cwd: envRoot,
          });

      //Do it right after build so /dist/server is there for init
      await corejamInit();

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
        watcher.on("change", async () => {
          const api = get("api");
          if (api) killProcess("api");
          jetpack.removeAsync(envRoot + "/.corejam");

          //We want schema changes to be there too
          await copySchemaToDist();
          await corejamInit();

          set("api", execa("corejam", ["api:serve"], { stdio: logToConsole, cwd: envRoot }));
        });
      }, 8000);
    } else {
      set("api", execa("corejam", ["api:serve"], { stdio: logToConsole, cwd: envRoot }));
    }

    bootSpinner.text = "Booting stencil...";

    await kill(3001);

    const args = ["build", "--dev", "--watch", "--serve"];
    const additionalEnv: { targets: string } = { targets: "" };

    if (options.ssr) {
      args.push("--ssr");
      additionalEnv.targets =
        additionalEnv.targets.length > 0
          ? additionalEnv.targets.concat(",prerender")
          : additionalEnv.targets.concat("prerender");
    }

    set(
      "stencil",
      execa("node_modules/.bin/stencil", args, {
        stdio: logToConsole,
        cwd: envRoot,
        env: {
          ...process.env,
          NODE_ENV: process.env.NODE_ENV || "development",
          ...additionalEnv,
        },
      })
    );

    bootSpinner.stopAndPersist({ text: "Watching for file change..." });
  } catch (e) {
    console.log(e);
  }
}
