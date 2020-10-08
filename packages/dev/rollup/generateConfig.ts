import { listAsync, readAsync } from "fs-jetpack";

export async function writeConfig() {
  const pluginPkg = require(process.cwd() + "/package.json");

  const root = process.cwd();

  const config = {
    mode: process.env.NODE_ENV,
    components: {},
    routes: {},
    wrapper: [],
    recommendations: [],
    dependencies: [],
    external: []
  };

  const regexTag = /tag: \"(.*)\"/;

  const components = (await listAsync(root + "/app/components")) || [];

  for (const component of components) {
    if (!component.includes(".ts")) {
      const componentLevel = (await listAsync(root + "/app/components/" + component)) || [];
      for (const file of componentLevel) {
        if (file.includes("tsx")) {
          const f = await readAsync(root + "/app/components/" + component + "/" + file);

          const tagMatch = f.match(regexTag);
          if (tagMatch)
            config["components"][tagMatch[1]] = {
              url: "/component/" + tagMatch[1],
              component: tagMatch[1]
            };
        }
      }
    }
  }

  const traverse = async lookupPath => {
    let paths = [];
    if (!lookupPath.includes(".md")) {
      paths = (await listAsync(lookupPath)) || [];
    }
    for (const current of paths) {
      if (current.indexOf("tsx") > -1) {
        const segments = lookupPath
          .replace(root + "/app/routes", null)
          .split("/")
          .filter(s => s !== "null");
        const isIndex = current === "index.tsx";
        const url =
          segments.length === 0
            ? `/${isIndex ? "" : current.replace(root, "").replace(".tsx", "")}`
            : `/${segments
              .join("/")
              .replace(root, "")
              .replace("/app/routes", "")}/${isIndex ? "" : current.replace(".tsx", "")}`;
        const f = await readAsync(lookupPath + "/" + current);
        const tagMatch = f.match(regexTag);
        if (tagMatch) {
          config["routes"][tagMatch[1]] = {
            url,
            component: tagMatch[1]
          };
        }
      } else {
        await traverse(lookupPath + "/" + current);
      }
    }
  };
  await traverse(root + "/app/routes");

  if (pluginPkg.corejam?.wrapper) config.wrapper = pluginPkg.corejam.wrapper;
  if (pluginPkg.corejam?.recommendations) config.recommendations = pluginPkg.corejam.recommendations;

  const depsBlacklist = ["@corejam/base", "@corejam/dev"];

  //TODO should this be both dev and normal dependancies?
  if (pluginPkg?.dependencies) {
    for (const key of Object.keys(pluginPkg?.dependencies)) {
      if (key.includes("@corejam/") && !depsBlacklist.includes(key)) {
        const pkg = require(key + "/package.json");
        if (pkg.corejam?.wrapper) config.wrapper = [...config.wrapper, ...pkg.corejam.wrapper];
        if (pkg.corejam?.recommendations)
          config.recommendations = [...config.recommendations, ...pkg.corejam.recommendations];
      }
    }
  }

  if (pluginPkg.corejam?.external) {
    config.external = pluginPkg.corejam.external;
  }

  return config;
}
