import { SeoModel } from "@corejam/base/dist/db/SeoModel";
import { Corejam } from "@corejam/base/src/db/ModelDecorator";
import { Product } from "./Product";

export class Manufacturer extends SeoModel {
  collection = "manufacturers";

  @Corejam({ relation: Product })
  products?: Product;

  @Corejam()
  name: string = "";
}
