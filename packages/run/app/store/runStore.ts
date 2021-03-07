import { createStore } from "@stencil/store";
import { CorejamRoute } from "./types";

export type CorejamMode = "development" | "production" | "static";

export type CorejamRunStore = {
  routes: CorejamRoute[];
  mode: CorejamMode;
  wrapper: string[] | [];
  recommendations: string[];
  layout: LayoutEntry[];
  plugins: any[];
};

type LayoutEntry = {
  component?: string;
};

export const {
  state: runState,
  get: runGet,
  reset: runReset,
  set: runSet,
  onChange: runChange,
} = createStore<CorejamRunStore>({
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
