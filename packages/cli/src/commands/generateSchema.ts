import { bootstrapSchema, loadManifest } from "@corejam/base/dist/Bootstrap";
import * as fs from "fs";
import * as path from "path"

function generateConstName(name: string) {
  return path.basename(name).replace("@corejam", "").replace("-", "").replace("/", "")
}

export default async function createSchema() {
  await bootstrapSchema();

  const plugins = loadManifest().plugins;

  const data = `
    ${plugins
      .map(
        (p: string) =>
          "const " + generateConstName(p) + " = require('" + p + "')"
      )
      .join(";\n")}
      ${plugins
      .map(
        (p: string) =>
          "const server" +
          generateConstName(p) +
          " = require('" +
          p +
          "/dist/server/index.js')"
      )
      .join(";\n")}
    module.exports = {
      ${plugins
      .map(
        (p: string, i: any) =>
          generateConstName(p) +
          ": " +
          generateConstName(p) +
          (i <= plugins.length - 1 ? "," : "")
      )
      .join("\n")}
    }
    module.exports.server = {
      ${plugins
      .map(
        (p: string, i: any) =>
          "server" +
          generateConstName(p) +
          ": " +
          "server" +
          generateConstName(p) +
          (i <= plugins.length - 1 ? "," : "")
      )
      .join("\n")}
    }
  `;

  fs.writeFileSync(process.cwd() + "/resolvers.js", data);
}
