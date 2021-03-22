import { Corejam } from "@corejam/base/dist/db/ModelDecorator";
import { User as BaseUser } from "@corejam/plugin-auth/dist/server/Models/User";
import { Address } from "../../shared/types/Address";

export class User extends BaseUser {
  @Corejam()
  firstName = "";

  @Corejam()
  lastName = "";

  @Corejam()
  addressBilling?: Address;

  @Corejam()
  addressShipping?: Address;
}
