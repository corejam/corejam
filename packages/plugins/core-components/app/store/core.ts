import { createPersistedQueryLink } from "@apollo/link-persisted-queries";
import { createStore } from "@stencil/store";
import { Router } from "stencil-router-v2";
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { Build } from "@stencil/core";

/**
 * Check if we are on the browser or in server. 
 * Server needs full endpoint path
 */
const httpLink = Build.isBrowser ? createHttpLink({
  uri: (process.env.API_ORIGIN ?? "") + "/api/graphql",
  credentials: "include"
}) : createHttpLink({
  uri: process.env.DEPLOYMENT_URL + "/api/graphql",
  credentials: "include"
})

const link = createPersistedQueryLink({ useGETForHashedQueries: true })
  //@ts-ignore
  .concat(httpLink);


let client;

if (Build.isBrowser) {
  client = new ApolloClient({
    cache: new InMemoryCache(),
    //@ts-ignore
    link,
  })
}
if (Build.isServer) {
  //We cant do top level awaits so we need to wrap this
  client = () => {
    const { ServerClient } = require("@corejam/base/dist/client/ServerClient")
    //@ts-ignore
    return  ServerClient.Create()
  }
}
export const { state: coreState, get: coreGet, reset: coreReset, set: coreSet, onChange: coreChange } = createStore({
  client: Build.isBrowser ? client : client(),
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
