module.exports = {
    "ignorePatterns": ["node_modules", "dist", "coverage", "www"],
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:import/errors",
        "plugin:import/warnings"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 12
    },
    "plugins": [
        "@typescript-eslint",
        "import"
    ],
    "rules": {
        "import/no-extraneous-dependencies": 2,
        "import/no-unresolved": 0,
        "@typescript-eslint/ban-ts-comment": 0,
        "@typescript-eslint/explicit-module-boundary-types": 0,
        "no-undef": 0,
        "@typescript-eslint/no-var-requires": 0,
        "@typescript-eslint/no-explicit-any": 0,
        "no-useless-escape": 0,
        "no-async-promise-executor": 0,
        "@typescript-eslint/ban-types": 0,
        "@typescript-eslint/no-non-null-assertion": 0,
        "no-prototype-builtins": 0,
        "@typescript-eslint/no-unused-vars": 0,
        "@typescript-eslint/no-namespace": 0
    },
};
