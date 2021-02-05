import { FaunaClient } from "@corejam/base/dist/resolvers/db/fauna/Client";
import { query as q } from "faunadb";
import type { SEODocument } from "../../../../shared/types/Seo";

export function objectFromURL(url: string): Promise<SEODocument> {
  return FaunaClient()
    .query(
      q.Merge(
        {
          type: q.Select(["ref", "collection", "id"], q.Get(q.Match(q.Index("seoSearch"), url))),
        },
        {
          data: q.Merge(
            {
              id: q.Select(["ref", "id"], q.Get(q.Match(q.Index("seoSearch"), url))),
            },
            q.Select(["data"], q.Get(q.Match(q.Index("seoSearch"), url)))
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

/**
 * Get the full SEO index. This is mainly used for SSR
 */
export async function getSEOIndex(): Promise<string[]> {
  return FaunaClient()
    .query(q.Map(q.Paginate(q.Match(q.Index("seoIndex"))), q.Lambda("x", q.Take(1, q.Var("x")))))
    .then((response: any) => {
      return response.data.flat();
    });
}
