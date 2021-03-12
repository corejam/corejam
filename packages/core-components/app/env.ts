export const env = {
  NODE_ENV: process.env.NODE__ENV,
  POSTCSS_BROWSERS: process.env.POSTCSS_BROWSERS ?? "last 4 version",
  API_ORIGIN: process.env.API_ORIGIN ?? "",
};
