import { ProductDB } from "./Product";
import { CategoryDB } from "./Category";
import { ManufacturerDB } from "./Manufacturer";
import { CanvasPageDB } from "@corejam/base/dist/typings/Canvas";

export type SEO = {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  url: string;
};

/**
 * These documents are all accessible through the SEO index and
 * one of the following will be returned through its Object.seo.url
 */
export type SEODocument = {
  product?: ProductDB | null;
  category?: CategoryDB | null;
  manufacturer?: ManufacturerDB | null;
  canvasPage?: CanvasPageDB | null;
};

export type SEOInput = {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  url: string;
};
