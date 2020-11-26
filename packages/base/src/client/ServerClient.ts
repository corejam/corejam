import { ApolloServer } from "apollo-server-micro";
import { ASTNode, print } from "graphql";
import { CorejamServer } from "../Server";

export type Variables = { [key: string]: any };

/**
 * This is typed as a promise so we can await in the query() in this instance.
 * if we dont do that we have an issue because we cant `await` top level in our hydrate
 * script.
 */
const corejamServer = new ApolloServer(CorejamServer());

/**
 * This function is used for our Stencil Hydrate render process.
 * We mix this into our coreState client by checking if we are on the server
 * or on the client (Browser).
 *
 * This should only ever be used on the server.
 *
 * We inject this query method so we can use the same interface on both the server &
 * on the client: client.query({query})
 *
 */
export function createServerClient() {
  return {
    query: async (input: { query: ASTNode; variables?: Variables }): Promise<any> => {
      return (await corejamServer).executeOperation({
        query: print(input.query),
        variables: input.variables,
      });
    },
  };
}
