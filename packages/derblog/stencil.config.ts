require("dotenv").config();

import { Config } from "@stencil/core";
import { reactOutputTarget } from "@stencil/react-output-target";
import corejam from "@corejam/rollup-plugin";
import fs from "fs";
import replace from "@rollup/plugin-replace";

const targets = process.env.targets?.split(",") || [];

const config: Config = {
  namespace: process.env.NODE_ENV === "production" ? "corejam-derblog" : "corejam-dev",
  tsconfig: "./tsconfig.json",
  srcDir: "app",
  srcIndexHtml: require.resolve("@corejam/run/dist/index.html"),
  devServer: {
    port: 3001,
  },
  outputTargets: [],
  plugins: [
    replace({
      "process.env.API_ORIGIN": JSON.stringify(process.env.API_ORIGIN),
    }),
    corejam()
  ],
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
    serviceWorker: null,
    baseUrl: "http://localhost:3001",
  });
}
if (targets.includes("react")) {
  if (!fs.existsSync("./react")) fs.mkdirSync("./react");
  config.outputTargets.push(
    reactOutputTarget({
      componentCorePackage: "@corejam/derblog",
      proxiesFile: "react/index.ts",
      loaderDir: "web-components/loader",
      includeDefineCustomElements: true,
      excludeComponents: [
        "app-liveview",
        "app-playground",
        "app-test-comp",
        "app-welcome",
        "corejam-run-app",
        "corejam-run-router",
      ],
    })
  );
}

export { config };
