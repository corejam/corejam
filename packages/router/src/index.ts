import { createStore } from "@stencil/store";
import { createRouter } from "stencil-router-v2";

export const { state, get, reset, set, onChange } = createStore({
  router: createRouter(),
});
