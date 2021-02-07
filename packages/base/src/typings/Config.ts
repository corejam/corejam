import { DBDocument } from "./DB";
import { SEO } from "./Seo";

export type Config = {
  seo: SEO;
  general: ConfigGeneral;
};

export type ConfigDB = DBDocument & Config;
export type ConfigEditInput = Partial<Config>;

export type ConfigGeneral = {
  admin_email: string;
};
