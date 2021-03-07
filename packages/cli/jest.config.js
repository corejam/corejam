const config = require("@corejam/base/jest.config");

config.modulePathIgnorePatterns = [
  "<rootDir>/src/templates"
]

module.exports = config;
