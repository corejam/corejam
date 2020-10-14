import { ApolloServer } from "apollo-server-micro";
import { ASTNode, print } from "graphql";
import { CorejamServer } from "../Server";

export type Variables = { [key: string]: any };

export class ServerClient {
  //@ts-ignore
  private server: Promise<ApolloServer>;

  public static Create() {
    const me = new ServerClient();
    me.server = CorejamServer();

    return me;
  }

  public async query(input: { query: ASTNode; variables?: Variables }): Promise<any> {
    return (await this.server).executeOperation({
      query: print(input.query),
      variables: input.variables,
    });
  }
}
