import { createStore } from "@stencil/store";
import { GraphQLClient } from "@corejam/base";
import { Router } from "stencil-router-v2";
import { Build } from "@stencil/core";

/**
 * We only want absolute url for hydrate on server
 */
export const { state: coreState, get: coreGet, reset: coreReset, set: coreSet, onChange: coreChange } = createStore({
  client: new GraphQLClient({
    mode: "cors",
    credentials: "include",
  }, Build.isBrowser, Build.isBrowser ? process.env.DEPLOYMENT_URL : null),
  endpoint: "",
});

type routerStateType = {
  router: null | Router;
};
export const { state: routerState, get: routerGet, reset: routerReset, set: routerSet, onChange } = createStore<
  routerStateType
>({
  router: null,
});
