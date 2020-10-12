import { createStore } from "@stencil/store";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { Router } from "stencil-router-v2";

/**
 * We only want absolute url for hydrate on server
 */
export const { state: coreState, get: coreGet, reset: coreReset, set: coreSet, onChange: coreChange } = createStore({
  client: new ApolloClient({
    cache: new InMemoryCache(),
    link: createHttpLink({
      uri: (process.env.API_ORIGIN ? process.env.API_ORIGIN : "") + "/api/graphql",
      credentials: 'include'
    }),
    credentials: 'include'
  }),
  endpoint: ""
});

type routerStateType = {
  router: null | Router;
};
export const { state: routerState, get: routerGet, reset: routerReset, set: routerSet, onChange } = createStore<
  routerStateType
>({
  router: null
});
