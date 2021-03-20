import { CoreModel } from "@corejam/base/dist/db/CoreModel";
import { Corejam } from "@corejam/base/src/db/ModelDecorator";
import { Category } from "./Category";
import { Manufacturer } from "./Manufacturer";

export class Product extends CoreModel {
  collection = "products";

  @Corejam({ relation: Manufacturer })
  manufacturer?: Manufacturer;

  @Corejam({ relation: Category })
  categories?: Category[];
}
