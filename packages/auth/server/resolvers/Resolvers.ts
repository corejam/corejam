import { updateDates } from "@corejam/base";
import { ID } from "@corejam/base/dist/typings/DB";
import * as bcrypt from "bcryptjs";
import {
  JWT,
  RegisterInput,
  STATUS,
  UpdatePasswordInput,
  UserCreateInput,
  UserInput
} from "../../shared/types/User";
import { AuthenticationError } from "../Errors";
import { decodeJWT, hashPassword } from "../Functions";
import User from "../Models/User";

export async function allUsers(): Promise<User[]> {
  return User.list()
}

export async function userCreate(userCreateInput: UserCreateInput): Promise<User> {
  const user = new User()
    .assignData({
      role: [User.ROLES.USER],
      status: STATUS.PENDING,
      ...userCreateInput,
      ...updateDates(),
    })

  return user.save();
}

export async function userEdit(id: ID, userInput: UserInput): Promise<User> {
  const user = await User.getById(id);
  user.assignData({ ...user.getData(), ...userInput }).save()

  return user;
}

export function userById(id: ID): Promise<User | null> {
  return User.getById(id);
}

export async function userByToken(token: string): Promise<User | null> {
  const payload = decodeJWT(token);

  return await userById(payload.id);
}

export async function userByEmail(email: string): Promise<User | null> {
  const user = await User.filter({ email: email })

  return user ? user[0] : null;
}

export async function userRegister(userInput: RegisterInput): Promise<User> {
  const user = new User()

  user.assignData({
    email: userInput.email,
    password: await hashPassword(userInput.password),
    active: true,
    status: STATUS.PENDING,
    role: [User.ROLES.USER],
    ...updateDates(),
  });

  return user.save();
}

export async function userAuthenticate(email: string, password: string): Promise<JWT> {
  const user = await userByEmail(email)

  //User isnt active or hasnt set a password yet
  if (!user || (!user.active || !user.password)) {
    throw new AuthenticationError();
  }

  return bcrypt.compare(password, user.password).then(async (result) => {
    if (result) {
      return await user.generateJWT();
    }

    throw new AuthenticationError();
  });
}

export async function userTokenRefresh(refreshToken: string): Promise<JWT> {
  const decodedRefresh = decodeJWT(refreshToken);
  const user = await userById(decodedRefresh.id);

  if (!user || !user.refreshToken) {
    throw new AuthenticationError();
  }

  return await user.generateJWT();
}

export async function userUpdatePassword(user: User, passwordInput: UpdatePasswordInput): Promise<Boolean> {
  const hashedPass = await hashPassword(passwordInput.password);

  user.password = hashedPass;
  await user.save();

  return new Promise((res) => res(typeof hashedPass === "string"));
}
