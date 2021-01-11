import type { Config, ConfigDB, ConfigEditInput } from "@corejam/base/dist/typings/Config";
import type { SEOInput } from "@corejam/base/dist/typings/Seo";
import { query as q } from "faunadb";
import { FaunaClient } from "@corejam/base/dist/resolvers/db/fauna/Client";

//Global config object for internal lambda caching
let schemaCache;

export function config(): Promise<ConfigDB> {
  return FaunaClient()
    .query(q.Get(q.Match(q.Index("configById"), "shopConfig")))
    .then((response: any) => {
      return {
        id: "shopConfig",
        ...response.data,
      };
    });
}

export function configCreate(configInput: Config): Promise<ConfigDB> {
  return FaunaClient()
    .query(
      q.Create(q.Collection("config"), {
        data: {
          ...configInput,
          id: "shopConfig",
        },
      })
    )
    .then((response: any) => {
      return {
        id: "shopConfig",
        ...response.data,
      };
    });
}

export function configEdit(_id: string, configInput: ConfigEditInput): Promise<ConfigDB> {
  return FaunaClient()
    .query(
      q.Update(q.Select(["data", 0], q.Paginate(q.Match(q.Index("configById"), "shopConfig"))), {
        data: {
          general: configInput.general,
        },
      })
    )
    .then((response: any) => {
      return response.data;
    });
}

export function configEditSEO(_id: string, seoInput: SEOInput): Promise<ConfigDB> {
  return FaunaClient()
    .query(
      q.Update(q.Select(["data", 0], q.Paginate(q.Match(q.Index("configById"), "shopConfig"))), {
        data: {
          seo: seoInput,
        },
      })
    )
    .then((response: any) => {
      return response.data;
    });
}

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

export function schemaEdit(schema): Promise<any> {
  return FaunaClient()
    .query(
      q.Update(q.Select(["data", 0], q.Paginate(q.Match(q.Index("configById"), "schema"))), {
        data: {
          id: "schema",
          ...schema,
        },
      })
    )
    .then((response: any) => {
      return response.data;
    });
}
