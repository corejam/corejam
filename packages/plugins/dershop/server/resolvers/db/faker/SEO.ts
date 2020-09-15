import { canvasPageByUrl } from "@corejam/base/dist/resolvers/db/faker/CanvasPage";
import type { SEODocument } from "../../../../shared/types/Seo";
import { allProducts } from "./Product";
import { manufacturerByUrl } from "./Manufacturer";
import { productByUrl } from "./Product";
import { categoryByUrl } from "./Category";

export async function objectFromURL(url: string): Promise<SEODocument> {
  const result = {
    category: await categoryByUrl(url),
    manufacturer: await manufacturerByUrl(url),
    product: await productByUrl(url),
    canvasPage: await canvasPageByUrl(url),
  };

  return new Promise((res) => res(result));
}

export async function getSEOIndex(): Promise<string[]> {
  const urls: string[] = [];

  (await allProducts()).map((product) => {
    if (product.seo?.url) urls.push(product.seo?.url);
  });

  return new Promise((res) => res(urls))
}