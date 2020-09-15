DB_DRIVER = process.env.DB_DRIVER ? process.env.DB_DRIVER : "DB_FAKER";

const DBDriverPaths = {
    DB_FAUNA: {
        coverageDirectory: "fauna",
    },
    DB_FAKER: {
        coverageDirectory: "faker",
    },
};

require('dotenv').config()

module.exports = {
    "globals": {
        "ts-jest": { "tsConfig": "tsconfig.json" }
    },
    preset: "ts-jest",
    coverageReporters: ["clover", "lcov"],
    collectCoverage: true,
    rootDir: process.cwd(),
    coverageDirectory: `<rootDir>/tests/.coverage/db/${DBDriverPaths[DB_DRIVER].coverageDirectory}`,
    collectCoverageFrom: [
        `<rootDir>/server/**/*.ts`,
    ],
    moduleNameMapper: {
        "@corejam/base/dist/(.*)": "<rootDir>/__LINKEDPKGS__/base/src/$1",
        "@corejam/base/(.*)": "<rootDir>/__LINKEDPKGS__/base/$1",
    }
}
