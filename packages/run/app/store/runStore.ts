import { createRouter, Router as RouterType } from "@stencil/router";
import { createStore } from "@stencil/store";

export { href } from "@stencil/router";

export const Router = createRouter();

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
  router: RouterType;
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
  router: Router,
  routes: null,
  mode: null,
  wrapper: null,
  recommendations: null,
  layout: null,
  plugins: null,
});

export const { state: menuState } = createStore({
  tabs: [],
});
