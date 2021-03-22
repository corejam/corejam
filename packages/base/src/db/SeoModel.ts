import { CoreModel } from "./CoreModel";
import { Corejam } from "./ModelDecorator";

export type SEO = {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  url: string;
};

/**
 * Any document that extends this class is available through
 * its url.
 */
export abstract class SeoModel extends CoreModel {
  @Corejam()
  seo?: SEO;

  //Before inserting we need to check the url is unique
  async preCreate(): Promise<this> {
    return super.preUpdate();
  }
}
