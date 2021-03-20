import { DBDocument } from "@corejam/base/dist/typings/DB";
import { Image } from "@corejam/base/dist/typings/Image";
import { Paginated, Timestamp } from "@corejam/base/dist/typings/Utils";
import { Canvas } from "@corejam/plugin-canvas/dist/shared/types/Canvas";
import { Manufacturer as ManufacturerModel } from "../../server/Models/Manufacturer";
import { Product } from "../../server/models/Product";
import { SEO } from "./Seo";

export type Manufacturer = Timestamp & {
  name: string;
  website?: string;
  description?: string;
  seo?: SEO;
  logo?: Image;
  products?: Product[];
  canvas?: Canvas;
};

export type ManufacturerDB = Manufacturer & DBDocument;

export type ManufacturerList = Paginated & {
  totalItems: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  items?: ManufacturerModel[] | [];
};

export type ManufacturerCreateInput = Manufacturer;
export type ManufacturerEditInput = Partial<Manufacturer>;
