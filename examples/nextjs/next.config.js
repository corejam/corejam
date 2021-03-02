require("dotenv").config();
const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  webpack: (config, ...rest) => {
    config.plugins.push(new Dotenv({
      path: path.join(__dirname, ".env"),
      systemvars: true,
      silent: true,
    }),)
    return config
  },
}