import { Client } from "faunadb";
import { getDataClient } from "../../../PluginManager";

export const FaunaClient = () =>
  getDataClient(
    "fauna",
    () => {
      const { SECRET_KEY = "" } = process.env;

      return new Client({
        secret: SECRET_KEY,
      });
    },
    true
  ) as Client;
