import { getDataClient } from "../../../PluginManager";
import { Client } from "faunadb";

export const FaunaClient = () =>
  getDataClient("fauna", () => {
    const { SECRET_KEY = "" } = process.env;

    return new Client({
      secret: SECRET_KEY,
    });
  }, true) as Client;
