import { SeoModel } from "@corejam/base/dist/db/SeoModel";
import { Corejam } from "@corejam/base/src/db/ModelDecorator";
import { Category } from "./Category";
import { Manufacturer } from "./Manufacturer";

export class Product extends SeoModel {
  collection = "products";

  @Corejam()
  name: string = "";

  @Corejam({ relation: Manufacturer })
  manufacturer?: Manufacturer;

  @Corejam({ relation: Category })
  categories?: Category[];
}
