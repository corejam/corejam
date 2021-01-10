export class AuthenticationError extends Error {
  constructor() {
    super("Authentication failed");
  }
}

export class MissingJWTHashException extends Error {
  constructor() {
    super("JWT_HASH not set in environment");
  }
}

export class AccountExistsError extends Error {
  constructor() {
    super("Account already exists");
  }
}

export class InvalidVerificationError extends Error {
  constructor() {
    super("Verification token not valid. Please try again");
  }
}

export class InvalidEmailError extends Error {
  constructor() {
    super("Invalid Email");
  }
}

export class PasswordsMustMatchException extends Error {
  constructor() {
    super("Passwords must match");
  }
}

export class PasswordValidateException extends Error {
  constructor() {
    super("should contain at least 8 characters, one digit, one lower case, one upper case");
  }
}

export class UnauthorizedException extends Error {
  constructor() {
    super("Not authorized. Check user permissions");
  }
}
