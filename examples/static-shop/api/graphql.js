require("dotenv").config();
const { CorejamServer } = require("@corejam/base/dist/Server");

module.exports = async (req, res) => {
  const CorejamServer = await CorejamServer();
  return CorejamServer.createHandler({ path: "/api/graphql" })(req, res);
};
