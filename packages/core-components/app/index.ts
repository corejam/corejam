export { Components, JSX } from "./components";
export * from "./store/core";
export * from "./utils/events";
export {};

import "@corejam/run";

declare global {
  /**
   * Target browsers for postcss
   */
  const POSTCSS_BROWSERS: string;
  /**
   * API Endpoint
   */
  const API_ORIGIN: string;
}
