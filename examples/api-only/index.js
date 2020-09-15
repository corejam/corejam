const { CorejamServer } = require("@corejam/base/dist/Server");
const { send } = require("micro");
const cors = require("micro-cors")();

const handler = async (req, res) => {
  if (req.method === "OPTIONS") {
    return send(res, 200, "ok!");
  }
  const server = await CorejamServer();
  return server.createHandler({ path: "/api/graphql" })(req, res);
};

module.exports = cors(handler);
