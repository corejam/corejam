import { SEO } from "./Seo";
import { DBDocument } from "./Utils";

export type Config = {
  seo: SEO;
  general: ConfigGeneral;
};

export type ConfigDB = DBDocument & Config;
export type ConfigEditInput = Partial<Config>;

export type ConfigGeneral = {
  admin_email: string;
};
