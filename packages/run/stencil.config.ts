import corejam from "@corejam/rollup-plugin";
import { Config } from "@stencil/core";
import { reactOutputTarget } from "@stencil/react-output-target";
import fs from "fs";

const targets = process.env.targets?.split(",") || [];

const config: Config = {
  namespace: "corejam-run",
  tsconfig: "./tsconfig.json",
  srcDir: "app",
  globalScript: "app/global.ts",
  devServer: {
    port: 3001,
  },
  outputTargets: [],
  plugins: corejam(),
};

if (targets.includes("dist")) {
  config.outputTargets.push({
    type: "dist",
    dir: "web-components",
    esmLoaderPath: "loader",
  });
}
if (targets.includes("custom")) {
  config.outputTargets.push({
    type: "dist-custom-elements-bundle",
    dir: "web-components/custom-elements",
  });
}
if (targets.includes("hydrate")) {
  config.outputTargets.push({
    type: "dist-hydrate-script",
    dir: "web-components/hydrate",
  });
}
if (targets.includes("prerender")) {
  config.outputTargets.push({
    type: "www",
    empty: false,
    prerenderConfig: "./prerender.config.ts",
    serviceWorker: null,
    baseUrl: "http://localhost:3000",
  });
}
if (targets.includes("react")) {
  if (!fs.existsSync("./react")) fs.mkdirSync("./react");
  config.outputTargets.push(
    reactOutputTarget({
      componentCorePackage: "@corejam/run",
      proxiesFile: "react/index.ts",
      loaderDir: "web-components/loader",
      includeDefineCustomElements: true,
      excludeComponents: ["corejam-dev-welcome", "corejam-run-app", "corejam-run-router"],
    })
  );
}

export { config };
