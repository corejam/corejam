import { updateDates } from "@corejam/base";
import * as bcrypt from "bcryptjs";
import { random } from "faker";
import { decodeJWT, generateTokensForUser, hashPassword } from "../../../Functions";
import { AuthenticationError } from "../../../Errors";
import { JWT, RegisterInput, UserCreateInput, UserDB, UserInput, roles, STATUS, UpdatePasswordInput } from "../../../../shared/types/User";
import { generateUser } from "./Generator";

export let users = [] as UserDB[];

try {
  const staticFile = require(process.cwd() + "/.corejam/faker.json")
  users.push(...staticFile.users)
  console.log("Load from static data")
} catch (e) {
  //Nothing for now
}

export function allUsers(): Promise<UserDB[]> {
  return new Promise((res) => res(users));
}

export function userCreate(userCreateInput: UserCreateInput): Promise<UserDB> {
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

export function userEdit(id: string, userInput: UserInput): Promise<UserDB> {
  let user = users.filter((user: UserDB) => {
    return user.id === id;
  })[0];

  user = { ...user, ...userInput };

  users = users.map((user: UserDB) => {
    if (user.id === id) {
      user = { ...user, ...userInput };
    }
    return user;
  });

  return new Promise((res) => res(user));
}

export function userById(id: string): Promise<UserDB | null> {
  const user = users.filter((user) => user.id === id)[0];
  return new Promise((res) => res(user));
}

export async function userByToken(token: string): Promise<UserDB | null> {
  const payload = decodeJWT(token);
  return await userById(payload.id);
}

export function userByEmail(email: string): Promise<UserDB | null> {
  const user = users.filter((user: UserDB) => {
    if (user.email == email) {
      return user;
    }
    return;
  });

  return new Promise((res) => res(user[0]));
}

export async function userRegister(userInput: RegisterInput): Promise<UserDB> {

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
      return await generateTokensForUser(user, userEdit);
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

  return await generateTokensForUser(user, userEdit);
}

export async function userUpdatePassword(user: UserDB, passwordInput: UpdatePasswordInput): Promise<Boolean> {
  const hashedPass = await hashPassword(passwordInput.password);

  users = users.map((userDb: UserDB) => {
    if (user.id === userDb.id) {
      userDb = { ...userDb, password: hashedPass };
    }
    return userDb;
  });

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
