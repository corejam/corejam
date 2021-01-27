import { createStore } from "@stencil/store";
import { createRouter, Router } from "stencil-router-v2";

export { href } from "stencil-router-v2";

export const { state, get, reset, set, onChange } = createStore({
  router: createRouter(),
});

export type CorejamMode = "development" | "production" | "static";

export type CorejamRoute = {
  url: string;
  exact: boolean;
  canvasPage?: boolean;
  component: string;
  dev?: boolean;
  third?: boolean;
};

export type CorejamRunStore = {
  router: Router;
  routes: CorejamRoute[];
  mode: CorejamMode;
  wrapper: string[] | [];
  recommendations: string[];
  layout: LayoutEntry[];
  plugins: any[];
};

type LayoutEntry = {
  component: string;
};

export const {
  state: runState,
  get: runGet,
  reset: runReset,
  set: runSet,
  onChange: runChange,
} = createStore<CorejamRunStore>({
  router: createRouter(),
  routes: null,
  mode: null,
  wrapper: null,
  recommendations: null,
  layout: null,
  plugins: null,
});
