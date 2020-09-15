import { query as q } from "faunadb";
import type { SEODocument } from "../../../../shared/types/Seo";
import { FaunaClient } from "@corejam/base/dist/resolvers/db/fauna/Client";

export function objectFromURL(url: string): Promise<SEODocument> {
  return FaunaClient()
    .query(
      q.Merge(
        {
          type: q.Select(["ref", "collection", "id"], q.Get(q.Match(q.Index("seo"), url))),
        },
        {
          data: q.Merge(
            {
              id: q.Select(["ref", "id"], q.Get(q.Match(q.Index("seo"), url))),
            },
            q.Select(["data"], q.Get(q.Match(q.Index("seo"), url)))
          ),
        }
      )
    )
    .then((response: any) => {
      return {
        category: response.type == "categories" ? { ...response.data } : null,
        manufacturer: response.type == "manufacturers" ? { ...response.data } : null,
        product: response.type == "products" ? { ...response.data } : null,
        canvasPage: response.type == "canvasPages" ? { ...response.data } : null,
      };
    });
}

export async function getSEOIndex(): Promise<string[]> {
  return new Promise((res) => res([] as string[]))
}