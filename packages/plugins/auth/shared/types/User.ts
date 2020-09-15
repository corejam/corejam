import { DBDocument, Paginated, Timestamp } from "@corejam/base/dist/typings/Utils";

export enum roles {
  ADMIN = "admin",
  USER = "user",
}

export type User = Timestamp & {
  email: string;
  password?: string;
  active: boolean;
  role: [roles];
  refreshToken?: string;
  dateCreated: string;
  dateUpdated: string;
};

export type UserDB = User & DBDocument;

export type UserInput = Partial<User>;

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
