export function CustomError() {
  const error = new Error();
  error.message = "Custom Error";

  return error;
}
