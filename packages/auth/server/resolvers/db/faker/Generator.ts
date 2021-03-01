import { internet, random } from "faker";
import { STATUS } from "../../../../shared/types/User";
import { User } from "../../../Models/User";

export function generateUser({
  active = random.boolean(),
  role = "user",
  email = internet.email(),
  password = internet.password(),
} = {}): User {
  return new User().assignData({
    active: active,
    role: [role],
    email: email,
    status: STATUS.PENDING,
    password: password,
  })
}
