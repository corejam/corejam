import { SEO } from "./Seo";
import { Timestamp, DBDocument, Paginated } from "./Utils";

export type CanvasPeer = {
  hash: string;
  offer: object;
};

export type CanvasPeers = {
  key: string;
  peers: CanvasPeer[];
};

export type Canvas = object;

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
