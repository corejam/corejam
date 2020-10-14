#!/usr/bin/env node

import sade from "sade";
import execa from "execa";
import chokidar from "chokidar";
import runBuild, { buildStatic } from "./commands/build";
import runDev from "./commands/dev";
import runApi from "./commands/apiServer";
import createApp from "./commands/generateApp";
import generateSchema from "./commands/generateSchema";
import { runTest, runWCTests } from "./commands/test";
import { envRoot } from "./config";
import { copySchemaToDist } from "./helpers/copy";
import { killAll } from "./processes";
import { corejamInit } from './commands/init';

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
  .command("dev")
  .describe("Plugin dev process")
  .option("-l, --log", "Log output to console", false)
  .action(async (opts) => {
    await corejamInit()
    await runDev(opts);
  });

prog
  .command("api:serve")
  .describe("Start graphql Server")
  .action(async () => {
    await corejamInit()
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
  await corejamInit()
  await generateSchema();
});

prog.command("test").action(async (opts) => {
  await runTest(opts);
});

prog.command("test:wc").action(async () => {
  await runWCTests();
});

prog.command("init")
  .describe("add `corejam init` as postInstall hook in your package.json")
  .action(async () => {
    await corejamInit()
  });

prog
  .command("static")
  .option("-l, --log", "Log output to console", false)
  .describe("build static html from app")
  .action(async (opts) => {
    await corejamInit()
    await buildStatic(opts);
  });

prog
  .command("static:serve")
  .describe("Serve static folder")
  .action(async () => {
    await corejamInit()
    runApi();
    execa("serve", ["www", "-l", "3001"], { cwd: envRoot });
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
