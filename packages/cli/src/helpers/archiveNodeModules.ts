import { envRoot, cliRoot, stencilRunner } from "../config";
import hash from "object-hash";
import jetpack from "fs-jetpack";
import archiver from "archiver";
import fs from "fs";
import extract from "extract-zip";

export async function cache() {
  return new Promise(async (res: any) => {
    try {
      const pkg = require(envRoot + "/package.json");
      await jetpack.dirAsync(cliRoot + "/_CACHE_");
      const modulesHash = hash(pkg);

      const output = fs.createWriteStream(cliRoot + "/_CACHE_/" + modulesHash + ".zip");
      const archive = archiver("zip", {
        zlib: { level: 9 }, // Sets the compression level.
      });

      output.on("close", res);

      archive.pipe(output);

      archive.directory(stencilRunner + "/node_modules", false);
      archive.finalize();
    } catch (e) {
      console.log(e);
    }
  });
}

export async function extractCache() {
  return new Promise(async (res: any) => {
    const pkg = require(envRoot + "/package.json");
    const modulesHash = hash(pkg);
    const cache = await jetpack.existsAsync(cliRoot + "/_CACHE_/" + modulesHash + ".zip");
    if (cache) {
      await jetpack.removeAsync(stencilRunner + "/node_modules");
      try {
        await extract(cliRoot + "/_CACHE_/" + modulesHash + ".zip", { dir: stencilRunner + "/node_modules" });
      } catch (e) {
        console.log(e);
      }
      res();
    }
  });
}

export async function hasCache() {
  const pkg = require(envRoot + "/package.json");
  const modulesHash = hash(pkg);
  const cache = await jetpack.existsAsync(cliRoot + "/_CACHE_/" + modulesHash + ".zip");
  return cache === "file";
}
