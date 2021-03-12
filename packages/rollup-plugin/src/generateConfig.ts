import { extractExternal, extractRecos, extractWrapper } from "./extractFromPackage";
import { extractComponentsToRoutes, extractRoutes } from "./extractRoutes";

export function writeConfig() {
  const pluginPkg = require(process.cwd() + "/package.json");

  const root = process.cwd();

  const config = {
    name: pluginPkg.name,
    version: pluginPkg.version,
    github_url: null,
    github_issues: null,
    author: null,
    homepage: null,
    description: null,
    mode: process.env.NODE_ENV,
    components: [],
    wrapper: [],
    recommendations: [],
    dependencies: [],
    external: [],
    router: {
      routes: [],
    },
    plugins: [],
  };

  const componentRoutes = extractComponentsToRoutes(root);
  const appRoutes = extractRoutes(root);
  const wrapper = extractWrapper(pluginPkg);
  const recommendations = extractRecos(pluginPkg);
  const external = extractExternal(pluginPkg);

  if (process.env.NODE_ENV === "development") {
    componentRoutes.push({
      url: "/_corejam",
      exact: true,
      component: "corejam-dev-welcome",
      dev: true,
    });
    componentRoutes.push({
      url: "/liveview",
      exact: true,
      component: "corejam-dev-liveview",
      dev: true,
    });
  }

  config.router.routes = [...componentRoutes, ...appRoutes];
  config.wrapper = [...wrapper];
  config.recommendations = [...recommendations];
  config.external = [...external];
  config.components = componentRoutes.map((c) => c.component);
  config.author = pluginPkg.author;
  config.homepage = pluginPkg.homepage;
  config.description = pluginPkg.description;
  config.github_url = pluginPkg.bugs?.url.replace("/issues", "");
  config.github_issues = pluginPkg.bugs?.url;
  const notToBeIncluded = ["@corejam/base", "@corejam/cli", "@corejam/run", "@corejam/rollup-plugin"];

  if (pluginPkg?.dependencies) {
    for (const key of Object.keys(pluginPkg?.dependencies)) {
      if (key.includes("@corejam/") && !notToBeIncluded.includes(key)) {
        const pkgConfig = {
          name: "",
          version: null,
          github_url: null,
          github_issues: null,
          author: null,
          homepage: null,
          description: null,
          components: [],
          wrapper: [],
          recommendations: [],
          dependencies: [],
          external: [],
          router: {
            routes: [],
          },
        };
        const pluginPkg = require(key + "/package.json");
        const pkgRoot = require.resolve(key + "/package.json").replace("/package.json", "");

        const componentRoutes = extractComponentsToRoutes(pkgRoot, pluginPkg.name);
        const appRoutes = extractRoutes(pkgRoot, pluginPkg.name);
        const wrapper = extractWrapper(pluginPkg);
        const recommendations = extractRecos(pluginPkg);
        const external = extractExternal(pluginPkg);
        pkgConfig.name = pluginPkg.name;
        pkgConfig.version = pluginPkg.version;
        pkgConfig.author = pluginPkg.author;
        pkgConfig.homepage = pluginPkg.homepage;
        pkgConfig.description = pluginPkg.description;
        pkgConfig.github_url = pluginPkg.bugs?.url.replace("/issues", "");
        pkgConfig.github_issues = pluginPkg.bugs?.url;
        pkgConfig.router.routes = [...componentRoutes, ...appRoutes];
        pkgConfig.components = componentRoutes.map((c) => c.component);
        pkgConfig.wrapper = [...wrapper];
        pkgConfig.recommendations = [...recommendations];
        pkgConfig.external = [...external];

        config.plugins.push(pkgConfig);
      }
    }
  }
  return config;
}
