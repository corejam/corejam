import { internet, random } from "faker";
import { STATUS } from "../../../../shared/types/User";
import { User } from "../../../Models/User";

export async function generateUser({
  active = random.boolean(),
  role = "user",
  email = internet.email(),
  password = internet.password(),
} = {}): Promise<User> {
  const user = new User()
  return await user.assignData({
    active: active,
    role: [role],
    email: email,
    status: STATUS.PENDING,
    password: password,
  })
}
