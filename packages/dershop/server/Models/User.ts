import { Coredata } from "@corejam/base/dist/db/ModelDecorator";
import { User as BaseUser } from "@corejam/plugin-auth/dist/server/Models/User";
import { Address } from "../../shared/types/Address";

export class User extends BaseUser {
  @Coredata()
  firstName = "";

  @Coredata()
  lastName = "";

  @Coredata()
  addressBilling?: Address;

  @Coredata()
  addressShipping?: Address;
}
