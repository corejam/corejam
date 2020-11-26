import { createStore } from "@stencil/store";

export type CorejamMode = "development" | "production" | "static";

export type CorejamRoute = {
  url: string;
  exact: boolean;
  component: string;
};

type CorejamRunStore = {
  routes: CorejamRoute[];
  mode: CorejamMode;
  wrapper: [string] | [];
  recommendations: [string];
  layout: LayoutEntry;
};

type LayoutEntry = {
  component: string;
};

export const { state: runState, get: runGet, reset: runReset, set: runSet, onChange: runChange } = createStore<
  CorejamRunStore
>({
  routes: null,
  mode: null,
  wrapper: null,
  recommendations: null,
  layout: null,
});
