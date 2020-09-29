import { createStore } from "@stencil/store";
import { userTokenRefreshMutationGQL } from "../../shared/graphql/Mutations";
import { coreState } from "@corejam/core-components";

export const { state: authStore, onChange: onChangeAuth } = createStore({
  identity: null,
});

onChangeAuth("identity", (value) => {
  if (value) {
    //Set timer
    coreState.client.setHeader("authorization", value.token);
    window.localStorage.setItem("canAuthenticate", "1");
  } else {
    coreState.client.setHeader("authorization", null);
    document.cookie = "refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    window.localStorage.removeItem("canAuthenticate");
  }
  return null;
});

initIdentityFromCookie();

async function initIdentityFromCookie() {
  if (!window.localStorage.getItem("canAuthenticate")) return;

  const request = await coreState.client.request(userTokenRefreshMutationGQL).catch((e) => {
    alert(e.message);
  });

  if (request.userTokenRefresh) {
    coreState.client.setHeader("authorization", request.userTokenRefresh.token);

    //Set identity at the end to make sure we have the right order
    authStore.identity = request.userTokenRefresh;
  }
}
