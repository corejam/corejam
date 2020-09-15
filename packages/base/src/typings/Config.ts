import { SEO } from "./Seo";
import { DBDocument } from "./Utils";
import { Canvas } from "./Canvas";

export type Config = {
  seo: SEO;
  general: ConfigGeneral;
  layout: LayoutConfig;
};

export type LayoutConfig = {
  header: Canvas;
  footer: Canvas;
};

export type ConfigDB = DBDocument & Config;
export type ConfigEditInput = Partial<Config>;

export type ConfigGeneral = {
  admin_email: string;
};
