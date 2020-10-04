import { CorejamServer } from "@corejam/base/dist/Server";
import micro, { send } from "micro";
require("dotenv").config();

const cors = require("micro-cors")({ origin: "http://localhost:3001" });

export default async function run() {
  const handler = async (req: any, res: any) => {
    if (req.method === "OPTIONS") {
      return send(res, 200, "ok!");
    }

    if (req.url.indexOf("/_corejam/static/") === 0) {
      const serveHandler = require('serve-handler');
      return await serveHandler(req, res, {
        "rewrites": [
          { "source": "_corejam/static/manifest.json", "destination": ".corejam/manifest.json" },
          { "source": "_corejam/static/schema.json", "destination": ".corejam/schema.json" }
        ]
      })
    } else {
      const server = await CorejamServer();
      return server.createHandler({ path: "/api/graphql" })(req, res);
    }
  };

  const devServer = () => cors(handler);
  const server = micro(devServer());
  server.listen(3000);
}
