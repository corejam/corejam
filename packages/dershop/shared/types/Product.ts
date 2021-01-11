import { Canvas } from "@corejam/plugin-canvas/dist/shared/types/Canvas";
import { Image } from "@corejam/base/dist/typings/Image";
import { DBDocument, Deliverability, Paginated, Timestamp } from "@corejam/base/dist/typings/Utils";
import { CategoryDB } from "./Category";
import { Manufacturer } from "./Manufacturer";
import { Price } from "./Price";
import { SEO } from "./Seo";
import { Sidebar } from "./Sidebar"

export type Product = Timestamp & {
  sku?: string;
  ean?: string;
  manufacturer_number?: string;
  active: boolean;
  promoted: boolean;
  manufacturer?: ManufacturerRefence;
  categories?: CategoryDB[]
  name: string;
  description?: string;
  deliverability?: Deliverability;
  seo?: SEO;
  images?: Image[];
  price?: Price;
  canvas?: Canvas;
  dateCreated: string;
  dateUpdated: string;
};

export type ProductDB = Product & DBDocument;

export type ManufacturerRefence = {
  id: string;
  data: Manufacturer;
};

export type ProductEditInput = Partial<Product>;

export type ProductCoreInput = {
  sku?: string;
  ean?: string;
  manufacturer_number?: string;
  active: boolean;
  promoted: boolean;
  name: string;
  description?: string;
};

export type ProductList = Paginated & {
  totalItems: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  sidebar: Sidebar
  items?: ProductDB[];
};
