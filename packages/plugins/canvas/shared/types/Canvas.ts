import { SEO } from "@corejam/base/dist/typings/Seo";
import { Timestamp, DBDocument, Paginated } from "@corejam/base/dist/typings/Utils";

export type CanvasPeer = {
  hash: string;
  offer: object;
};

export type CanvasPeers = {
  key: string;
  peers: CanvasPeer[];
};

//Serialized object or string containing html
export type Canvas = object | string;

export type CanvasPage = Timestamp & {
  canvas: Canvas;
  seo?: SEO;
  peers?: CanvasPeers;
};

export type CanvasPageList = Paginated & {
  totalItems: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  items?: CanvasPageDB[] | [];
};

export type CanvasPageDB = DBDocument & CanvasPage;
