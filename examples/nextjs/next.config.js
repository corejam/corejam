require("dotenv").config();
const path = require("path");
const Dotenv = require("dotenv-webpack");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const webpack = withBundleAnalyzer({
  webpack: (config) => {
    config.plugins = config.plugins || [];
    config.plugins = [
      ...config.plugins,
      new Dotenv({
        path: path.join(__dirname, ".env"),
        systemvars: true,
        silent: true,
      }),
    ];
    return config;
  }
});

module.exports = webpack;
