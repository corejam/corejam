import * as bcrypt from "bcryptjs";
import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
import { JWT, UpdatePasswordInput, UserDB } from "../shared/types/User";
import {
  AuthenticationError,
  InvalidEmailError,
  MissingJWTHashException,
  PasswordsMustMatchException,
  PasswordValidateException,
  UnauthorizedException,
} from "./Errors";

//Set some defaults
const JWT_EXPIRES = process.env.JWT_EXPIRES ?? "15";

//Default the JWT refresh expiry to 60 minutes * 24 hours * 30 days
const JWT_REFRESH_EXPIRES = process.env.JWT_REFRESH_EXPIRES;
if (!JWT_REFRESH_EXPIRES) process.env.JWT_REFRESH_EXPIRES = (60 * 24 * 30).toString();

export function decodeJWT(token: string): any {
  if (!process.env.JWT_HASH || !process.env.JWT_HASH.length) throw new MissingJWTHashException();

  return jwt.verify(token, process.env.JWT_HASH);
}

export function encodeJWTPayload(payload: any, expires = JWT_EXPIRES): string {
  if (!process.env.JWT_HASH || !process.env.JWT_HASH.length) throw new MissingJWTHashException();

  return jwt.sign(payload, process.env.JWT_HASH, { expiresIn: `${expires}m` });
}

export async function generateTokensForUser(user: UserDB, editFn: (userId, data) => {}): Promise<JWT> {
  const payload = {
    id: user.id,
    role: user.role,
  };

  const token = encodeJWTPayload(payload, process.env.JWT_EXPIRES);
  const refreshToken = encodeJWTPayload(payload, process.env.JWT_REFRESH_EXPIRES);

  await editFn(user.id, { refreshToken });

  return {
    user: user,
    token: token,
    refreshToken: refreshToken,
  };
}

/**
 * Sets the initial verify hash for email
 */
export async function generateVerifyHash(user: UserDB, editFn: (userId, data) => {}): Promise<string> {
  const verifyHash = crypto.randomBytes(20).toString("hex");
  await editFn(user.id, {
    verifyHash,
  });

  return new Promise((res) => res(verifyHash));
}

export function validateAuthInput(email: string) {
  const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!pattern.test(String(email).toLowerCase())) {
    throw new InvalidEmailError();
  }
}

export function validatePasswordCreate(input: UpdatePasswordInput) {
  if (input.password !== input.passwordConfirm) {
    throw new PasswordsMustMatchException();
  }

  const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  if (!pattern.test(input.password)) {
    throw new PasswordValidateException();
  }
}

/**
 * Check if user has associated role.
 *
 * @param user
 */
export function checkUserHasRole(user: UserDB, checkRole: string) {
  if (!user) throw new AuthenticationError();
  let res = false;

  user.role.forEach((role) => {
    if (role === checkRole) res = true;
  });

  if (!res) throw new UnauthorizedException();

  return res;
}

/**
 * Hash a password string using bcrypt
 * @param password
 */
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;

  const salt: string = await new Promise((resolve) => {
    bcrypt.genSalt(saltRounds, (_err, salt) => {
      resolve(salt);
    });
  });

  return await new Promise((resolve) => {
    bcrypt.hash(password, salt, (_err, hash) => {
      resolve(hash);
    });
  });
}
