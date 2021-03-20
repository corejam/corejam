import { DBDocument } from "@corejam/base/dist/typings/DB";
import { Paginated, Timestamp } from "@corejam/base/dist/typings/Utils";
import { Canvas } from "@corejam/plugin-canvas/dist/shared/types/Canvas";
import { Category as CategoryModel } from "../../server/Models/Category";
import { Product } from "./Product";
import { SEO } from "./Seo";

export type Category = Timestamp & {
  name: string;
  seo?: SEO;
  parent?: CategoryReference;
  active: boolean;
  description?: string;
  products?: Product[];
  canvas?: Canvas;
};

export type CategoryDB = Category & DBDocument;

export type CategoryReference = {
  id: string;
  data: Category;
};

export type CategoryList = Paginated & {
  totalItems: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  items?: CategoryModel[] | [];
};

export type CategoryCreateInput = Category & {
  id?: string;
};

export type CategoryEditInput = Partial<Category>;
