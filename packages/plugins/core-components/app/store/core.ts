import { createPersistedQueryLink } from "apollo-link-persisted-queries";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { createStore } from "@stencil/store";
import { Router } from "stencil-router-v2";

const link = createPersistedQueryLink({ useGETForHashedQueries: true })
  .concat(createHttpLink({
    uri: (process.env.API_ORIGIN ? process.env.API_ORIGIN : "") + "/api/graphql",
  }));


/**
 * We only want absolute url for hydrate on server
 */
export const { state: coreState, get: coreGet, reset: coreReset, set: coreSet, onChange: coreChange } = createStore({
  client: new ApolloClient({
    cache: new InMemoryCache(),
    link,
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
