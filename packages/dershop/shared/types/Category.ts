import { DBDocument, Paginated, Timestamp } from "@corejam/base/dist/typings/Utils";
import { Canvas } from "@corejam/plugin-canvas/dist/shared/types/Canvas";
import { ProductDB } from "./Product";
import { SEO } from "./Seo";

export type Category = Timestamp & {
  name: string;
  seo?: SEO;
  parent?: CategoryReference;
  active: boolean;
  description?: string;
  products?: ProductDB[];
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
  items?: CategoryDB[] | [];
};

export type CategoryCreateInput = Category & {
  id?: string;
};

export type CategoryEditInput = Partial<Category>;
