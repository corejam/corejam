require("dotenv").config();

import { CorejamServer } from "@corejam/base/dist/Server";
import micro, { send } from "micro";

const cors = require("micro-cors")({ origin: "http://localhost:3001" });

export default async function run() {
  const corejamServer = await CorejamServer();

  const handler = async (req: any, res: any) => {
    if (req.method === "OPTIONS") {
      return send(res, 200, "ok!");
    }

    return corejamServer.createHandler({ path: "/api/graphql" })(req, res);
  };

  const devServer = () => cors(handler);
  const server = micro(devServer());
  server.listen(3000);
}
