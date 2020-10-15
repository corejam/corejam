import { ApolloServer } from "apollo-server-micro";
import { ASTNode, print } from "graphql";
import { CorejamServer } from "../Server";

export type Variables = { [key: string]: any };

/**
 * This class is used for our Stencil Hydrate render process.
 * We mix this into our coreState client by checking if we are on the server
 * or on the client (Browser).
 *
 * This should only ever be used on the server.
 */
export class ServerClient {
  /**
   * This is typed as a promise so we can await in the query() in this instance.
   * if we dont do that we have an issue because we cant `await` top level in our hydrate
   * script.
   */
  private server!: Promise<ApolloServer>;

  public static Create() {
    const me = new ServerClient();
    me.server = CorejamServer();

    return me;
  }

  /**
   * We inject this query method so we can use the same interface on both the server &
   * on the client: client.query({query})
   *
   * @param input
   */
  public async query(input: { query: ASTNode; variables?: Variables }): Promise<any> {
    return (await this.server).executeOperation({
      query: print(input.query),
      variables: input.variables,
    });
  }
}
