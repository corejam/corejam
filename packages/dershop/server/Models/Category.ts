import { Corejam } from "@corejam/base/dist/db/ModelDecorator";
import { SeoModel } from "@corejam/base/dist/db/SeoModel";
import { Product } from "./Product";

export class Category extends SeoModel {
  collection = "categories";

  @Corejam({ relation: Product })
  products?: Product[];

  @Corejam()
  name: string = "";
}
