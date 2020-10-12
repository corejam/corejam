import { CorejamServer } from "@corejam/base/dist/Server";
require("dotenv").config();

//const cors = require("micro-cors")({ origin: "http://localhost:3001" });

export default async function run() {

  /*
  const handler = async (req: any, res: any) => {
    if (req.method === "OPTIONS") {
      return send(res, 200, "ok!");
    }

    const server = await CorejamServer();
    return server.createHandler({ path: "/api/graphql" })(req, res);
  };

  const devServer = () => cors(handler);
  const server = micro(devServer());
  server.listen(3000);*/

  (await CorejamServer()).listen({port: 3000}).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
}
