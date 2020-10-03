import { ApolloServer } from "apollo-server-micro";
import { CorejamServer } from "../Server";
import { Variables } from "./types";

export class ServerClient {
  //@ts-ignore
  private server: ApolloServer;

  public static Create = async () => {
    const me = new ServerClient();
    me.server = await CorejamServer();

    return me;
  };

  async request(query: string, variables?: Variables): Promise<any> {
    return this.server.executeOperation({
      query: query,
      variables,
    });
  }
}
