import { InMemoryCache } from "@apollo/client/cache";
import { ApolloClient } from "@apollo/client/core";
import { ErrorLink } from "@apollo/client/link/error";
import { createHttpLink } from "@apollo/client/link/http";
import { createPersistedQueryLink } from "@apollo/client/link/persisted-queries";
import { Build } from "@stencil/core";
import { createStore } from "@stencil/store";
import { sha256 } from "crypto-hash";
import { Components } from "../components";
import { FlashEvent, FlashTypes } from "../utils/events";

let client;

if (Build.isBrowser) {
  const httpLink = createHttpLink({
    uri: (process.env.API_ORIGIN ?? "") + "/api/graphql",
    credentials: "include",
    useGETForQueries: true,
  });

  /**
   * When we receive an error sent down from the server we dispatch a custom event
   * to trigger the corejam-error component to display
   */
  const errorLink = new ErrorLink(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        if (message === "PersistedQueryNotFound") return;

        const error = new FlashEvent(FlashTypes.ERROR, message);
        document.dispatchEvent(error);
        console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);

        /**
         * If there is no defined flash space within the currenty route we
         * default back to the modal
         */
        const checkForExistingFlash = document.querySelectorAll("corejam-flash:not([data-flash='isolated'])");

        if (checkForExistingFlash.length === 0) {
          const modal = document.createElement("corejam-modal") as Components.CorejamModal & HTMLElement;
          modal.message = message;
          modal.type = "error";
          document.body.appendChild(modal);
        }
      });
      return null;
    }
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  const link = createPersistedQueryLink({
    useGETForHashedQueries: true,
    sha256,
  })
    .concat(errorLink)
    .concat(httpLink);

  client = new ApolloClient({
    cache: new InMemoryCache(),
    link,
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
