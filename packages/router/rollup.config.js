export default {
  input: "build/index.js",

  output: [
    {
      format: "cjs",
      file: "dist/index.js",
    },
    {
      format: "esm",
      file: "dist/index.esm.js",
    },
  ],
  external: ["@stencil/store", "stencil-router-v2"],
};
