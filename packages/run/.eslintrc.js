var path = require("path");

module.exports = {
  extends: [path.join(__dirname, "../../.eslintrc.js")],
  ignorePatterns: ["web-components", "react", "www", "server", "tests",  "app/env.ts", "stencil.config.ts"],
  rules: {
    "no-process-env": 2
  }
};
