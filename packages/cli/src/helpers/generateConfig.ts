import jetpack from "fs-jetpack";
import { stencilRunner, envRoot } from "../config";
import { prependImports } from "./modifyGlobal";
import { getDependencies } from "./dependencies";

type ConfigJson = {
  components: any;
  routes: any;
  wrapper: string[] | [];
  recommendations: string[] | [];
  dependencies: string[] | [];
  external: string[] | [];
};

export async function writeConfig() {
  const pluginPkg = require(envRoot + "/package.json");

  const config: ConfigJson = {
    components: {},
    routes: {},
    wrapper: [],
    recommendations: [],
    dependencies: [],
    external: [],
  };
  const regexTag = /tag: \"(.*)\"/;
  jetpack.removeAsync(stencilRunner + "/src/config.json");

  const topLevel = (await jetpack.listAsync(stencilRunner + "/src/components")) || [];

  for (const component of topLevel) {
    const componentLevel = (await jetpack.listAsync(stencilRunner + "/src/components/" + component)) || [];
    for (const file of componentLevel) {
      if (file.includes("tsx")) {
        const f = (await jetpack.readAsync(stencilRunner + "/src/components/" + component + "/" + file)) as string;

        const tagMatch = f.match(regexTag);
        const folder = component.includes("route") ? "routes" : "components";
        const routeUrl = component.toLowerCase().replace("route", "").split("-").join("/");

        if (tagMatch)
          config[folder][tagMatch[1]] = {
            url: folder === "routes" ? routeUrl : "/component/" + tagMatch[1],
            component: tagMatch[1],
          };
      }
    }
  }

  if (pluginPkg.corejam.wrapper) config.wrapper = pluginPkg.corejam.wrapper;
  if (pluginPkg.corejam.recommendations) config.recommendations = pluginPkg.corejam.recommendations;

  const corejamDeps = await getDependencies();

  if (pluginPkg.corejam.external) {
    config.external = pluginPkg.corejam.external;
  }

  config.dependencies = [...corejamDeps.filter((v) => v !== "@corejam/cli")];

  corejamDeps.forEach((dep) => {
    const pkg = require(dep + "/package.json");
    if (pkg.corejam && pkg.corejam.wrapper) config.wrapper = [...config.wrapper, ...pkg.corejam.wrapper];
    if (pkg.corejam && pkg.corejam.recommendations) {
      const tmpReco = [...config.recommendations, ...pkg.corejam.recommendations];
      config.recommendations = tmpReco.length > 0 ? tmpReco : [];
    }
  });

  await prependImports(corejamDeps);

  jetpack.writeAsync(stencilRunner + "/src/config.json", config);
}
