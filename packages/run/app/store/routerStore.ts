import { createRouter, Router as RouterType } from "@stencil/router";
import { createStore } from "@stencil/store";

export { href } from "@stencil/router";

export type CorejamRouterStore = {
  router: RouterType;
};

const { state, set } = createStore<CorejamRouterStore>({
  router: createRouter(),
});

export const routerState = state;

export const setPatchedRouter = (router) => {
  const patchedRouter = {
    ...router,
    onHrefRender: () => undefined,
    serializeURL: () => undefined,
  };
  set("router", patchedRouter);
};
