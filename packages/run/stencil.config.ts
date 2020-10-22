import { Config } from "@stencil/core";
import corejam from "@corejam/rollup-plugin";
export const config: Config = {
  namespace: "corejam-run",
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
  plugins: [corejam()],
};
