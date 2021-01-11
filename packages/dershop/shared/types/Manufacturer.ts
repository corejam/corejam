import { Canvas } from "@corejam/plugin-canvas/dist/shared/types/Canvas";
import { Image } from "@corejam/base/dist/typings/Image";
import { DBDocument, Paginated, Timestamp } from "@corejam/base/dist/typings/Utils";
import { ProductDB } from "./Product";
import { SEO } from "./Seo";

export type Manufacturer = Timestamp & {
  name: string;
  website?: string;
  description?: string;
  seo?: SEO;
  logo?: Image;
  products?: ProductDB[];
  canvas?: Canvas;
};

export type ManufacturerDB = Manufacturer & DBDocument;

export type ManufacturerList = Paginated & {
  totalItems: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  items?: ManufacturerDB[] | [];
};

export type ManufacturerCreateInput = Manufacturer;
export type ManufacturerEditInput = Partial<Manufacturer>;
