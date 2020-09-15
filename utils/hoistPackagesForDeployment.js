const fs = require("fs-jetpack");
const path = require("path");

const noDS = (v) => v !== ".DS_Store";
const noPlugin = (v) => v !== "plugins";
const resolvePath = (a) => (b) => path.resolve(paths[a], b);
const LINKEDFOLDERNAME = "__LINKEDPKGS__";
const paths = {
  examples: path.resolve(__dirname, "..", "examples"),
  packages: path.resolve(__dirname, "..", "packages"),
  plugins: path.resolve(__dirname, "..", "packages", "plugins"),
};

const projects = fs.list("examples").filter(noDS).map(resolvePath("examples"));
const pkgs = fs.list("packages").filter(noDS).filter(noPlugin);
const plugins = fs.list("packages/plugins").filter(noDS);

const depMap = new Map();

async function copyDirs(targetPath) {
  const linkedRoot = targetPath + "/" + LINKEDFOLDERNAME;
  fs.dir(linkedRoot);
  pkgs.forEach((p) => fs.copy(`${paths["packages"]}/${p}`, linkedRoot + "/" + p, { overwrite: true }));
  plugins.forEach((p) => fs.copy(`${paths["plugins"]}/${p}`, linkedRoot + "/" + p, { overwrite: true }));
}

async function buildDependencyMap(targetPath, folderName) {
  const pkgJson = fs.read(targetPath + "/package.json", "json");
  if (pkgJson && !depMap.has(pkgJson.name)) depMap.set(pkgJson.name, folderName);
}

async function replaceVersions(targetPath) {
  const packageJson = fs.read(targetPath + "/package.json", "json");
  const dot = targetPath.indexOf(LINKEDFOLDERNAME) > -1 ? ".." : "./" + LINKEDFOLDERNAME;
  depMap.forEach((v, key) => {
    if (!packageJson) return;
    if (packageJson.dependencies) {
      packageJson.dependencies[key] ? (packageJson.dependencies[key] = `file:${dot}/` + v) : "";
    }
    if (packageJson.devDependencies) {
      packageJson.devDependencies[key] ? (packageJson.devDependencies[key] = `file:${dot}/` + v) : "";
    }
  });
  if (packageJson)
  fs.write(targetPath + "/package.json", packageJson);
}

async function removeNodeModules(targetPath) {
  fs.remove(targetPath + "/node_modules");
}

projects.forEach(copyDirs);
fs.list(projects[0] + "/" + LINKEDFOLDERNAME).forEach((p) =>
  buildDependencyMap(projects[0] + "/" + LINKEDFOLDERNAME + "/" + p, p)
);
projects.forEach(replaceVersions);

const linkedPkgs = [];
projects.forEach((p) =>
  fs.list(p + "/" + LINKEDFOLDERNAME).map((v) => linkedPkgs.push(p + "/" + LINKEDFOLDERNAME + "/" + v))
);

linkedPkgs.forEach(replaceVersions);
linkedPkgs.forEach(removeNodeModules);
