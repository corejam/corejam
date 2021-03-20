import { CoreModel } from "@corejam/base/dist/db/CoreModel";
import { Corejam } from "@corejam/base/src/db/ModelDecorator";
import { Product } from "./Product";

export class Manufacturer extends CoreModel {
  collection = "manufacturers";

  @Corejam({ relation: Product })
  products?: Product;

  @Corejam()
  name: string = "";
}
