import { Config } from "@stencil/core";

export const config: Config = {
  namespace: "corejam-dev",

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
      copy: [
        {
          src: "config.json",
          dest: "build/config.json",
        },
      ],
      serviceWorker: null, // disable service workers
    },
  ],
  plugins: [],
};
