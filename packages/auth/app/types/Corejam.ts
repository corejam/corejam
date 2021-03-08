/**
 * DO NOT EDIT
 * This file is auto generated from your model @Corejam() decorators
 * It should be commited as a way to keep track of your public facing
 * model changes that interact with your frontend
 */

enum STATUS {
  PENDING = "PENDING",
  VERIFIED = "VERIFIED",
}

enum ROLES {
  ADMIN = "admin",
  USER = "user",
}

export type AuthReset = {
  expires: string;
  hash: string;
};

export type User = {
  email: string;
  status: STATUS;
  active: boolean;
  role: [ROLES];
  refreshToken?: string;
};
