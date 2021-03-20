import { CoreModel } from "@corejam/base/dist/db/CoreModel";
import { Corejam } from "@corejam/base/dist/db/ModelDecorator";
import { Product } from "./Product";

export class Category extends CoreModel {
  collection = "categories";

  @Corejam({ relation: Product })
  products?: Product;

  @Corejam()
  name: string = "";
}
