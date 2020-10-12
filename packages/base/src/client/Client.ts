import { ApolloClient, createHttpLink, gql, InMemoryCache } from "@apollo/client";

export type Variables = { [key: string]: any };

export class GraphQLClient {
  private client: ApolloClient<any>;

  constructor() {
    this.client = new ApolloClient({
      cache: new InMemoryCache(),
      link: createHttpLink({ uri: process.env.DEPLOYMENT_URL + "/api/graphql" }),
    });
  }

  async request<T = any>(query: string, variables?: Variables): Promise<T> {
    return (await this.client.query({ query: gql(query), variables })).data;
  }
}
