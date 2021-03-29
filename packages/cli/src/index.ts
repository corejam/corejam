#!/usr/bin/env node

import chokidar from "chokidar";
import execa from "execa";
import killPort from "kill-port";
import sade from "sade";
import runApi from "./commands/apiServer";
import { bootstrap } from "./commands/bootstrap";
import runBuild, { buildStatic } from "./commands/build";
import runDev from "./commands/dev";
import createApp from "./commands/generateApp";
import generateSchema from "./commands/generateSchema";
import { corejamInit } from "./commands/init";
import { runWCTests } from "./commands/test";
import { envRoot } from "./config";
import { copySchemaToDist } from "./helpers/copy";
import { killAll } from "./processes";
const pkg = require("../package.json");
const prog = sade("corejam");

prog.version(pkg.version);

prog
  .command("build")
  .describe("Build the whole plugin source")
  .option("-l, --log", "Log output to console", true)
  .option("-wc, --webComponents", "Web components only build", false)
  .option("-s, --server", "Build server code only", false)
  .action(async (opts) => {
    await runBuild(opts);
  });

prog
  .command("bootstrap")
  .describe("Bootstrap data")
  .option("-l, --log", "Log output to console", false)
  .action(async (opts) => {
    await bootstrap(opts);
  });

prog
  .command("dev")
  .describe("Plugin dev process")
  .option("-l, --log", "Log output to console", false)
  .option("-ssr", "Server side render each request", false)
  .action(async (opts) => {
    await runDev(opts);
  });

prog
  .command("api:serve")
  .describe("Start graphql Server")
  .action(async () => {
    await corejamInit();
    await runApi();
  });

prog
  .command("api:dev")
  .describe("Start graphql server and set up hot reloading")
  .action(async () => {
    await copySchemaToDist();
    execa("tsc", ["-p", "tsconfig-cjs.json", "-w"], { stdio: "inherit", cwd: envRoot });
    let api: any;
    api = execa("corejam", ["api:serve"], { stdio: "inherit", cwd: envRoot });

    console.log("Serving under: http://localhost:3000/api/graphql");

    setTimeout(() => {
      const watcher = chokidar.watch(envRoot + "/server", {
        ignored: "*.d.ts",
      });
      watcher.on("change", () => {
        api.cancel();
        api = execa("corejam", ["api:serve"], { stdio: "inherit", cwd: envRoot });
      });
    }, 8000);
  });

prog
  .command("createApp <name>")
  .describe("Bootstraps new corejam app")
  .action(async (name) => {
    await createApp(name);
  });

prog.command("generateSchema").action(async () => {
  await corejamInit();
  await generateSchema();
});

prog.command("test:wc").action(async () => {
  await runWCTests();
});

prog
  .command("init")
  .describe("add `corejam init` as postInstall hook in your package.json")
  .option("path", "Set a custom path to the root directory", process.cwd())
  .action(async (options) => {
    await corejamInit(options);
  });

prog
  .command("static")
  .option("-l, --log", "Log output to console", false)
  .describe("build static html from app")
  .action(async (opts) => {
    await corejamInit(opts);
    await buildStatic(opts);
  });

prog
  .command("static:serve")
  .describe("Serve static folder")
  .action(async () => {
    await corejamInit();
    runApi();
    await killPort(3001);
    execa("serve", ["www", "-l", "3001"], { env: { ...process.env }, cwd: envRoot });
    console.log("Serving under: http://localhost:3001");
  });

function cleanUp() {
  killAll();
  process.exit(1);
}
process.on("unhandledRejection", cleanUp);
process.on("uncaughtException", cleanUp);
process.on("SIGINT", cleanUp);

prog.parse(process.argv);
