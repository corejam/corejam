import { updateDates } from "@corejam/base";
import { ID } from "@corejam/base/dist/typings/DB";
import * as bcrypt from "bcryptjs";
import { random } from "faker";
import {
  JWT,
  RegisterInput,
  roles,
  STATUS,
  UpdatePasswordInput,
  UserCreateInput,
  UserDB,
  UserInput,
} from "../../shared/types/User";
import { AuthenticationError } from "../Errors";
import { decodeJWT, generateTokensForUser, hashPassword } from "../Functions";
import { User } from "../Models/User";
import { generateUser } from "./db/faker/Generator";


export function allUsers(): Promise<UserDB[]> {
  return new Promise((res) => res(users));
}

export function userCreate(userCreateInput: UserCreateInput): Promise<User> {
  const user: UserDB = {
    id: random.uuid(),
    role: [roles.USER],
    status: STATUS.PENDING,
    ...userCreateInput,
    ...updateDates(),
  };

  users.push(user);

  return new Promise((res) => res(user));
}

export async function userEdit(id: ID, userInput: UserInput): Promise<User> {
  const user = await User.getById(id);
  user.assignData(userInput).save()

  return user;
}

export function userById(id: ID): Promise<User | null> {
  return User.getById(id);
}

export async function userByToken(token: string): Promise<User | null> {
  const payload = decodeJWT(token);

  return await userById(payload.id);
}

export function userByEmail(email: string): Promise<User | null> {
  const user = users.filter((user: UserDB) => {
    if (user.email == email) {
      return user;
    }
    return;
  });

  return new Promise((res) => res(user[0]));
}

export async function userRegister(userInput: RegisterInput): Promise<User> {
  const userObj: UserDB = {
    id: random.uuid(),
    email: userInput.email ? userInput.email : "",
    password: await hashPassword(userInput.password),
    active: true,
    status: STATUS.PENDING,
    role: [roles.USER],
    ...updateDates(),
  };

  users.push(userObj);
  return userObj;
}

export function userAuthenticate(email: string, password: string): Promise<JWT> {
  const userFilter = users.filter((user) => {
    if (user.email == email) {
      return user;
    }
    return;
  });

  const user: UserDB = userFilter[0];

  //User isnt active or hasnt set a password yet
  if (!user.active || !user.password) {
    throw new AuthenticationError();
  }

  return bcrypt.compare(password, user.password).then(async (result) => {
    if (result) {
      return await generateTokensForUser(user);
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

  return await generateTokensForUser(user);
}

export async function userUpdatePassword(user: User, passwordInput: UpdatePasswordInput): Promise<Boolean> {
  const hashedPass = await hashPassword(passwordInput.password);

  user.password = hashedPass;
  await user.save();

  return new Promise((res) => res(typeof hashedPass === "string"));
}

if (process.env.FAKER_MODULE === "auth") {
  if (users.length === 0) {
    for (let index = 0; index < 10; index++) {
      const generated: UserDB = {
        id: random.uuid(),
        ...generateUser(),
      };

      users.push(generated);
    }
  }

  //We want a test account
  userRegister({
    email: "test@test.com",
    password: "valid123Password@",
    passwordConfirm: "valid123Password@",
  }).then((user) => {
    userEdit(user.id, { role: [roles.ADMIN] });
  });
}
