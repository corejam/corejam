require("dotenv").config();
import { Config } from "@stencil/core";
import { reactOutputTarget } from "@stencil/react-output-target";
import corejam from "@corejam/dev/dist/rollup";
import fs from "fs";
import replace from "@rollup/plugin-replace";

const targets = process.env.targets?.split(",") || [];

const config: Config = {
  namespace: process.env.NODE_ENV === "production" ? "corejam-plugin-auth" : "corejam-dev",
  tsconfig: "./tsconfig.json",
  srcDir: "app",
  srcIndexHtml: require.resolve("@corejam/dev/dist/index.html"),
  devServer: {
    port: 3001
  },
  outputTargets: [],
  plugins: [
    replace({
      "process.env.API_ORIGIN": JSON.stringify(process.env.API_ORIGIN),
      "process.env.JWT_HASH": JSON.stringify(process.env.JWT_HASH)
    })
  ]
};

if (process.env.NODE_ENV !== "production") {
  config.plugins.push(corejam());
}

if (targets.includes("dist")) {
  config.outputTargets.push({
    type: "dist",
    dir: "web-components",
    esmLoaderPath: "loader"
  });
}
if (targets.includes("custom")) {
  config.outputTargets.push({
    type: "dist-custom-elements-bundle",
    dir: "web-components/custom-elements"
  });
}
if (targets.includes("hydrate")) {
  config.outputTargets.push({
    type: "dist-hydrate-script",
    dir: "web-components/hydrate"
  });
}
if (targets.includes("prerender")) {
  config.outputTargets.push({
    type: "www",
    empty: false,
    serviceWorker: null,
    baseUrl: "http://localhost:3000"
  });
}
if (targets.includes("react")) {
  if (!fs.existsSync("./react")) {
    fs.mkdirSync("./react");
  }

  config.outputTargets.push(
    reactOutputTarget({
      componentCorePackage: "@corejam/stencil-runner",
      proxiesFile: "../react-bindings/src/components.ts",
      loaderDir: "web-components/loader"
    })
  );
}

export { config };
