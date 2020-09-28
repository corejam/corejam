import { createStore } from "@stencil/store";
import { GraphQLClient } from "@corejam/base";
import { Build } from "@stencil/core";

let Client;

if (Build.isBrowser) {
  Client = new GraphQLClient(
    {
      mode: "cors",
      credentials: "include"
    },
    process.env.NODE_ENV !== "production" ? process.env.DEPLOYMENT_URL : null
  );
}

if (!Build.isBrowser) {
  Client = new GraphQLClient(
    {
      mode: "cors",
      credentials: "include"
    },
    process.env.DEPLOYMENT_URL
  );
}

/**
 * We only want absolute url for hydrate on server
 */
export const { state: coreState, get: coreGet, reset: coreReset, set: coreSet, onChange: coreChange } = createStore({
  client: Client,
  endpoint: ""
});
