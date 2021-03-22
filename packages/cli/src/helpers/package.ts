export const packageJson = (mono = false) => `{
  "name": "pluginName",
  "version": "0.1.0",
  "private": true,
  "license": "MIT",
  "main": "web-components/index.cjs.js",
  "module": "web-components/custom-elements/index.js",
  "es2015": "web-components/esm/index.js",
  "es2017": "web-components/esm/index.js",
  "types": "web-components/custom-elements/index.d.ts",
  "collection": "web-components/collection/collection-manifest.json",
  "collection:main": "web-components/collection/index.js",
  "scripts": {
    "dev": "corejam dev",
    "build": "corejam build",
    "test": "corejam test",
    "precommit": "lint-staged",
    "static": "corejam static -l",
    "static:serve": "corejam static:serve",
    "clean": "rimraf dist & rimraf react & rimraf web-components"
  },
  "files": [
    "dist",
    "web-components"
  ],
  "devDependencies": {
    "tslib": "2.1.0",
    "typescript": "4.1.2",
    "@types/faker": "5.1.4",
    "@corejam/base": "${mono ? require("../../../base/package.json").version : "latest"}",
    "@corejam/core-components": "${mono ? require("../../../core-components/package.json").version : "latest"}",
    "@corejam/cli": "${mono ? require("../../../cli/package.json").version : "latest"}",
    "@corejam/run": "${mono ? require("../../../run/package.json").version : "latest"}",
    "@corejam/rollup-plugin": "${mono ? require("../../../rollup-plugin/package.json").version : "latest"}",
    "faker": "5.1.0",
    "@stencil/react-output-target": "0.0.9",
    "@stencil/core": "2.4.0",
    "rollup-plugin-node-polyfills": "0.2.1"
  },
  "corejam": {
    "wrapper": [],
    "recommendations": []
  }
}`;
