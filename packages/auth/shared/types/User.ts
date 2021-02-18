import { Paginated, Timestamp } from "@corejam/base/dist/typings/Utils";
import { DBDocument } from "@corejam/base/dist/typings/DB";

export enum ROLES {
  ADMIN = "admin",
  USER = "user",
}

export enum STATUS {
  PENDING = "PENDING",
  VERIFIED = "VERIFIED",
}

export type User = Timestamp & {
  email: string;
  password?: string;
  status: STATUS;
  verifyHash?: string;
  active: boolean;
  role: [ROLES];
  refreshToken?: string;
  authReset?: AuthReset;
  dateCreated: string;
  dateUpdated: string;
};

export type UserDB = User & DBDocument;

export type UserInput = Partial<User>;

export type AuthReset = {
  expires: string;
  hash: string;
};

export type UserCreateInput = {
  email: string;
  password?: string;
  active: boolean;
};

export type JWTPayload = {
  role: [string];
  id: string;
};

export type JWT = {
  user: UserDB;
  token: string;
  refreshToken: string;
};

export type UserList = Paginated & {
  totalItems: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  items?: UserDB[] | [];
};

export type RegisterInput = {
  email: string;
  password: string;
  passwordConfirm: string;
};

export type UpdateUserInput = {
  email: string;
};

export type UpdatePasswordInput = {
  oldPassword: string;
  password: string;
  passwordConfirm: string;
};
