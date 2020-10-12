import { createStore } from "@stencil/store";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { Router } from "stencil-router-v2";
import { createPersistedQueryLink } from "apollo-link-persisted-queries";

const pql = createPersistedQueryLink({ useGETForHashedQueries: true })
  //@ts-ignore
  .concat(createHttpLink({
    uri: (process.env.API_ORIGIN ? process.env.API_ORIGIN : "") + "/api/graphql",
    credentials: 'include',
  }));


/**
 * We only want absolute url for hydrate on server
 */
export const { state: coreState, get: coreGet, reset: coreReset, set: coreSet, onChange: coreChange } = createStore({
  client: new ApolloClient({
    cache: new InMemoryCache(),
    //@ts-ignore
    link: pql,
    credentials: 'include',
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
