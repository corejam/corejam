import { CoreModel } from "@corejam/base/dist/db/CoreModel";
import { Corejam } from "@corejam/base/src/db/ModelDecorator";
import { User } from "@corejam/plugin-auth/dist/server/Models/User";
import { Address } from "../../shared/types/Address";

enum OrderStatus {
  RECEIVED = "RECEIVED",
  PROCESSING = "PROCESSING",
  SHIPPING = "SHIPPING",
  COMPLETED = "COMPLETED",
  ERROR = "ERROR",
}

export class Order extends CoreModel {
  collection = "orders";

  static STATUS = OrderStatus;

  //Reference to the user object
  @Corejam({ relation: User })
  user: User;

  @Corejam()
  addressBilling: Address;

  @Corejam()
  addressShipping: Address;

  @Corejam()
  items: any;

  constructor(user: User, addressBilling: Address, addressShipping: Address) {
    super();

    this.user = user;
    this.addressBilling = addressBilling;
    this.addressShipping = addressShipping;
  }
}
