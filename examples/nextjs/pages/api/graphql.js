import { CorejamServer } from "@corejam/base/dist/Server";
const { send } = require("micro");
const cors = require("micro-cors")();

try {
  require("../../resolvers.js");
} catch (e) {
  console.log("runtime generation");
}

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  if (req.method === "OPTIONS") {
    return send(res, 200, "ok!");
  }

  const server = await CorejamServer();
  return server.createHandler({ path: "/api/graphql" })(req, res);
};

export default cors(handler);
