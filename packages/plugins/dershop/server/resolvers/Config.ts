import { MergedServerContext } from "../../shared/types/PluginResolver";

export default {
  Query: {
    config: (_obj: any, _args: any, { models }: MergedServerContext) => {
      return models.config();
    },
  },
  Mutation: {
    updateConfig: (_obj: any, { id, configInput }, { models }: MergedServerContext) => {
      return models.configEdit(id, configInput);
    },
    updateConfigSEO: (_obj: any, args: any, { models }: MergedServerContext) => {
      return models.configEditSEO("shopConfig", args.seoInput);
    },
    /*
    cacheFlush: () => {
      let serverUrl = "/api/graphql"; //Client can have relative

      //SSR needs absolute
      if (process.env.API_ORIGIN) {
        serverUrl = `${process.env.API_ORIGIN}/api/graphql`;
      }

      const link = ApolloLink.from([
        //  createPersistedQueryLink({ useGETForHashedQueries: true }),
        createHttpLink({
          uri: serverUrl, // Server URL (must be absolute)
          credentials: "same-origin", // Additional fetch() options like `credentials` or `headers`
          fetch,
          fetchOptions: {
            mode: "no-cors",
          },
          useGETForQueries: true,
          headers: {
            "Cache-Control": "stale-while-revalidate",
          },
        }),
      ]);

      // Check out https://github.com/zeit/next.js/pull/4611
      // if you want to use the AWSAppSyncClient
      const client = new ApolloClient({
        // Disables forceFetch on the server (so queries are only run once)
        ssrMode: typeof window === "undefined",
        link: link,
        cache: new InMemoryCache(),
      });

      try {
        client.query({ query: allProductsGQL });
        //client.query({ query: adminProductByIdGQL, })
        client.query({
          query: paginateProductsGQL,
          variables: {
            page: 1,
            size: 24,
          },
        });
      } catch (e) {
        console.log("aaaah", e);
      }

      return true;
    }, */
  },
};
