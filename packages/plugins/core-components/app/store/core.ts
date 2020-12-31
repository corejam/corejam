import { InMemoryCache } from '@apollo/client/cache';
import { ApolloClient } from '@apollo/client/core';
import { createHttpLink } from "@apollo/client/link/http";
import { ErrorLink } from "@apollo/client/link/error"
import { createPersistedQueryLink } from "@apollo/link-persisted-queries";
import { Build } from "@stencil/core";
import { createStore } from "@stencil/store";
import { Components } from "../components"

let client;

if (Build.isBrowser) {
  const httpLink = createHttpLink({
    uri: (process.env.API_ORIGIN ?? "") + "/api/graphql",
    credentials: "include",
  });

  /**
   * When we receive an error sent down from the server we dispatch a custom event
   * to trigger the corejam-error component to display
   */
  const errorLink = new ErrorLink(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        if (message === "PersistedQueryNotFound") return;

        const error = new CustomEvent('corejam:error', { detail: { msg: message } })
        document.dispatchEvent(error)
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )

        const modal = document.createElement("corejam-modal") as Components.CorejamModal & HTMLElement
        modal.message = message
        modal.type = "error"
        document.body.appendChild(modal)

      });
      return null
    }
    if (networkError) console.log(`[Network error]: ${networkError}`);
  })

  const link = createPersistedQueryLink({ useGETForHashedQueries: true })
    //@ts-ignore
    .concat(errorLink)
    //@ts-ignore
    .concat(httpLink)

  client = new ApolloClient({
    cache: new InMemoryCache(),
    //@ts-ignore
    link
  });
}

if (Build.isServer) {
  /**
   * When we are on the server we want to use the ServerClient instance
   * so we can fetch directly on our resolvers instead of launching another lambda
   * process to resolve over http.
   */
  client = () => {
    const { createServerClient } = require("@corejam/base/dist/client/ServerClient");
    return createServerClient();
  };
}

export const { state: coreState, get: coreGet, reset: coreReset, set: coreSet, onChange: coreChange } = createStore({
  client: Build.isBrowser ? client : client(),
  endpoint: "",
});
