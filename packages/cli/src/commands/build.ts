import chalk from "chalk";
import execa from "execa";
import jetpack, { removeAsync } from "fs-jetpack";
import kill from "kill-port";
import ora from "ora";
import { resolve } from "path";
import { envRoot } from "../config";
import { copySchemaToDist } from "../helpers/copy";
import { prependNoCheckToComponents } from "../helpers/prependInFile";

export default async function run(options: any) {
  return new Promise<void>(async (res, rej) => {
    try {
      const envPackage = require(envRoot + "/package.json");
      const envPackageName = envPackage.name;

      const bootSpinner = ora(`Starting build for ${chalk.bold.green(envPackageName)}...`).start();

      const logToConsole = options.l ? "inherit" : "ignore";

      await jetpack.removeAsync(envRoot + "/dist");

      bootSpinner.text = "Bundling server code";
      await buildServerCode();
      bootSpinner.text = "Finished server build";

      if (options.s) {
        bootSpinner.succeed();
        return;
      }

      bootSpinner.text = "Generating web components build";
      await jetpack.removeAsync(envRoot + "/react");
      await jetpack.removeAsync(envRoot + "/web-components");

      await kill(3001);

      await execa("node_modules/.bin/stencil", ["build"], {
        stdio: logToConsole,
        cwd: envRoot,
        env: {
          ...process.env,
          NODE_ENV: process.env.NODE_ENV || "production",
          targets: "dist,custom,hydrate,react",
        },
      });

      if (!options.wc && envPackage.files.includes("react")) {
        bootSpinner.text = "Generating react bindings";

        /**
         * We do this because of our current import setup in component file
         *
         * e.g. dershop has dep. on auth and so all of auth gets pulled in dershop
         *
         * TODO correct app splitting and bootstrapping
         */
        await prependNoCheckToComponents();

        await execa(
          "node_modules/.bin/tsc",
          [
            "./react/index.ts",
            "--jsx",
            "react",
            "--target",
            "es5",
            "--moduleResolution",
            "node",
            "--esModuleInterop",
            "true",
          ],
          {
            stdio: logToConsole,
            cwd: envRoot,
          }
        );

        //@ts-ignore
        // await rollup(rollupBundle);

        bootSpinner.text = "React bindings finished";

        if (jetpack.exists(envRoot + "/server")) {
          bootSpinner.text = "Bundling server code";
          buildServerCode();
          bootSpinner.text = "Bundling server code finished";
        }
      }
      bootSpinner.succeed("Finished plugin build");
      res();
    } catch (e) {
      console.log(e);
      rej();
    }
  });
}

export async function buildStatic(options: any) {
  await removeAsync(resolve(envRoot, "www"));

  const envPackageName = require(envRoot + "/package.json").name;

  const bootSpinner = ora(`Starting static build for ${chalk.bold.green(envPackageName)}...`).start();

  const api = execa("corejam", ["api:serve"], { stdio: "ignore", cwd: envRoot });

  bootSpinner.text = "Generating static files";

  await execa("stencil", ["build", "--prerender"], {
    cwd: envRoot,
    stdio: options.log ? "inherit" : "ignore",
    env: {
      ...process.env,
      NODE_ENV: "static",
      targets: "prerender",
    },
  });

  api.kill();

  bootSpinner.succeed("Finished static build");
}

async function buildServerCode() {
  if (jetpack.exists(envRoot + "/server")) {
    await copySchemaToDist();

    await execa("node_modules/.bin/tsc", ["-p", "tsconfig-mjs.json"], { cwd: envRoot });
    await execa("node_modules/.bin/tsc", ["-p", "tsconfig-cjs.json"], { cwd: envRoot });
  }
}
