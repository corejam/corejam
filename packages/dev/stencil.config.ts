import { Config } from "@stencil/core";
export const config: Config = {
  namespace: "corejam-dev",
  srcDir: "app",
  devServer: {
    port: 3001,
  },
  outputTargets: [
    {
      type: "dist",
      dir: "dist",
      esmLoaderPath: "../loader",
    },
    {
      type: "dist-custom-elements-bundle",
      dir: "dist/custom-elements",
    },
    {
      type: "docs-readme",
    },
    {
      type: "www",
      serviceWorker: null, // disable service workers
    },
  ],
};
