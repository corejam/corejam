var path = require("path");

module.exports = {
  extends: [path.join(__dirname, "../../.eslintrc.js")],
  ignorePatterns: ["web-components", "react", "www", "static", "_tmp_"],
};
