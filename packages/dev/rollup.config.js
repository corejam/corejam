import typescript from "@rollup/plugin-typescript";

export default {
  input: "rollup/index.ts",
  output: {
    dir: "dist/rollup",
    format: "cjs",
    exports: "auto",
  },
  plugins: [typescript({ include: "rollup" })],
};
