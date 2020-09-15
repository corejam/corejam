module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2015,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "no-console": process.env.NODE_ENV === "production" ? 2 : 0,
    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
    "no-prototype-builtins": 0,
    "react/self-closing-comp": [
      "error",
      {
        component: true,
        html: true,
      },
    ],
    "react/display-name": 0,
  },
  globals: {
    React: "writable",
  },
  plugins: ["graphql"],
  settings: {
    react: {
      version: "detect",
    },
  },
};
