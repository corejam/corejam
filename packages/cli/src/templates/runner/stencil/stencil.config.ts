import { Config } from "@stencil/core";
import { reactOutputTarget } from "@stencil/react-output-target";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { env } from "@alepop/stencil-env";
import { promises as fs } from "fs";
import fs2 from "fs";
import { JsonDocs } from "@stencil/core/internal";

async function generateCustomElementsJson(docsData: JsonDocs) {
  const jsonData = {
    version: 1.2,
    tags: docsData.components.map((component) => ({
      name: component.tag,
      path: component.filePath,
      description: component.docs,

      attributes: component.props
        .filter((prop) => prop.attr)
        .map((prop) => ({
          name: prop.attr,
          type: prop.type,
          description: prop.docs,
          defaultValue: prop.default,
          required: prop.required,
        })),

      events: component.events.map((event) => ({
        name: event.event,
        description: event.docs,
      })),

      methods: component.methods.map((method) => ({
        name: method.name,
        description: method.docs,
        signature: method.signature,
      })),

      slots: component.slots.map((slot) => ({
        name: slot.name,
        description: slot.docs,
      })),

      cssProperties: component.styles
        .filter((style) => style.annotation === "prop")
        .map((style) => ({
          name: style.name,
          description: style.docs,
        })),

      cssParts: component.parts.map((part) => ({
        name: part.name,
        description: part.docs,
      })),
    })),
  };

  if (!fs2.existsSync("./www")) await fs.mkdir("./www");
  if (!fs2.existsSync("./www/assets")) await fs.mkdir("./www/assets");
  try {
    await fs.writeFile("./www/assets/custom-elements.json", JSON.stringify(jsonData, null, 2));
  } catch (e) {
    console.log(e);
  }
}

export const config: Config = {
  namespace: "corejam_dev_mapping",
  globalScript: "src/global.ts",
  devServer: {
    port: 3001,
  },
  rollupPlugins: {
    after: [nodeResolve()],
  },
  outputTargets: [
    {
      type: "dist",
      esmLoaderPath: "./loader",
    },
    {
      type: "dist-custom-elements-bundle",
    },
    {
      type: "docs-custom",
      generator: generateCustomElementsJson,
    },
    {
      type: "dist-hydrate-script",
      dir: "dist/hydrate",
    },
    {
      type: "www",
      empty: false,
      serviceWorker: null, // disable service worker
      baseUrl: "http://localhost:5000",
    },
    reactOutputTarget({
      componentCorePackage: "@corejam/stencil-runner",
      proxiesFile: "../react-bindings/src/components.ts",
      loaderDir: "web-components/loader",
    }),
  ],
  plugins: [env()],
};
