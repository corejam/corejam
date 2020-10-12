import { coreState } from "@corejam/core-components";
import { createStore } from "@stencil/store";
import gql from "graphql-tag";
import { userTokenRefreshMutationGQL } from "../../shared/graphql/Mutations";
//import { setContext } from '@apollo/client/link/context';
//import { ApolloLink } from "@apollo/client"

export const { state: authStore, onChange: onChangeAuth } = createStore({
  identity: null,
});

onChangeAuth("identity", (value) => {
  if (value) {
    /*
    coreState.client.setLink(
      ApolloLink.from([
        setContext((_, { headers }) => {
          // return the headers to the context so httpLink can read them
          return {
            headers: {
              ...headers,
              authorization: value.token,
            }
          }
        }),
        coreState.client.link
      ]))*/
    window.localStorage.setItem("canAuthenticate", "1");
  } else {
    document.cookie = "refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    window.localStorage.removeItem("canAuthenticate");
  }
  return null;
});

initIdentityFromCookie();

async function initIdentityFromCookie() {
  if (!window.localStorage.getItem("canAuthenticate")) return;

  const request = await coreState.client.mutate(
    { mutation: gql(userTokenRefreshMutationGQL) }
  );

  //Set identity at the end to make sure we have the right order
  authStore.identity = request.data.userTokenRefresh;
}
