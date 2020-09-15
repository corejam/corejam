import { query as q } from "faunadb";
import { FaunaClient } from "./Client";

let schemaCache;

export async function schema(): Promise<any> {
  if (schemaCache) return schemaCache;

  return FaunaClient()
    .query(q.Get(q.Match(q.Index("configById"), "schema")))
    .then((response: any) => {
      schemaCache = {
        id: "schema",
        ...response.data,
      };

      return schemaCache;
    });
}
