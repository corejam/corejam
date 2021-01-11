import { createStore } from "@stencil/store";

export const { state: dershopState, onChange: dershopChange } = createStore({
  search: null,
});

window?.addEventListener("routeChange", (_e) => {
  dershopState.search = null;
});
