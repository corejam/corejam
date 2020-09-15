import { date, internet, random } from "faker";
import { User, roles } from "../../../../shared/types/User";

export function generateUser({
  active = random.boolean(),
  role = roles.USER,
  email = internet.email(),
  password = internet.password(),
  dateCreated = date.past(2).toISOString(),
  dateUpdated = date.past(1).toISOString(),
} = {}): User {
  return {
    active: active,
    role: [role],
    email: email,
    password: password,
    dateCreated: dateCreated,
    dateUpdated: dateUpdated,
  };
}
