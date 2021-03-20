import { DBDocument } from "@corejam/base/dist/typings/DB";
import { Image } from "@corejam/base/dist/typings/Image";
import { Deliverability, Paginated, Timestamp } from "@corejam/base/dist/typings/Utils";
import { Canvas } from "@corejam/plugin-canvas/dist/shared/types/Canvas";
import { Category } from "../../server/Models/Category";
import { Manufacturer } from "./Manufacturer";
import { Price } from "./Price";
import { SEO } from "./Seo";
import { Sidebar } from "./Sidebar";

export type Product = Timestamp & {
  sku?: string;
  ean?: string;
  manufacturer_number?: string;
  active: boolean;
  promoted: boolean;
  manufacturer?: ManufacturerRefence;
  categories?: Category[];
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
  sidebar: Sidebar;
  items?: Product[];
};
