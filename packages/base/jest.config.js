const path = require("path");
const fs = require("fs");

/**
 * Prevent hoisted files hanging around
 */
if (fs.existsSync(process.cwd() + "/resolvers.js")) {
  fs.unlinkSync(process.cwd() + "/resolvers.js");
}

require("dotenv").config();

module.exports = {
  globals: {
    "ts-jest": { tsconfig: __dirname + "/tsconfig-jest.json" },
  },
  setupFilesAfterEnv: [__dirname + "/jest.setup.js"],
  preset: "ts-jest",
  coverageReporters: ["clover", "lcov"],
  collectCoverage: true,
  rootDir: process.cwd(),
  resetMocks: true,
  coverageDirectory: `<rootDir>/tests/.coverage`,
  collectCoverageFrom: [`<rootDir>/src/**/*.ts`, `<rootDir>/server/**/*.ts`],
  moduleNameMapper: {
    "@corejam/base/dist/(.*)": __dirname + "/src/$1",
    "@corejam/base/(.*)": __dirname + "/$1",
    "@corejam/notify/dist/(.*)": path.resolve(__dirname + "/../notify") + "/$1",
    "@corejam/notify/(.*)": path.resolve(__dirname + "/../notify") + "/$1",
    "@corejam/plugin-auth/dist/(.*)": path.resolve(__dirname + "/../auth") + "/$1",
    "@corejam/plugin-auth/(.*)": path.resolve(__dirname + "/../auth") + "/$1",
    "@corejam/plugin-dershop/dist/(.*)": path.resolve(__dirname + "/../dershop") + "/$1",
    "@corejam/plugin-dershop/(.*)": path.resolve(__dirname + "/../dershop") + "/$1",
  },
};
