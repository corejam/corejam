import { ApolloServer, gql } from "apollo-server-micro";
import { IncomingMessage } from "http";
import { Socket } from "net";
import { createServerClient } from "../src/client/ServerClient";
import Response from "../src/Response";
import { CorejamServer } from "../src/Server";
import { testClient } from "../src/TestClient";

describe("Server", () => {
  it("CorejamServer boots correctly", async () => {
    const corejamServer = new ApolloServer(CorejamServer());

    expect(corejamServer.requestOptions).toHaveProperty("cache");
    expect(corejamServer.requestOptions).toHaveProperty("persistedQueries");

    const schemaTypes = await corejamServer.executeOperation({ query: "{__schema { types{name}}}" });
    expect(schemaTypes.data?.__schema.types).toContainEqual({ name: "Timestamp" });
    expect(schemaTypes.data?.__schema.types).toContainEqual({ name: "Paginated" });
  });

  it("ServerClient resolves query", async () => {
    const serverClient = createServerClient();

    const schemaTypes = await serverClient.query({ query: gql("{__schema { types{name}}}") });
    expect(schemaTypes.data?.__schema.types).toContainEqual({ name: "Timestamp" });
    expect(schemaTypes.data?.__schema.types).toContainEqual({ name: "Paginated" });
  });

  it("TestClient actually uses our mocked server instance", async () => {
    const client = await testClient();
    const { query } = client;

    const test = await query({ query: gql("{__schema { types{name}}}") });

    expect(test.data?.__schema.types).toContainEqual({ name: "Timestamp" });
    expect(test.data?.__schema.types).toContainEqual({ name: "Paginated" });
  });

  it("Test Response object has context headers set", async () => {
    const context = {};
    process.env.AWS_EXECUTION_ENV = "AWS_Lambda_TEST";

    const response = new Response(new IncomingMessage(new Socket()), context);

    //Reset env
    delete process.env.AWS_EXECUTION_ENV;

    response.setHeader("test", "test");

    expect(response.context?.headers).toEqual([
      {
        name: "test",
        value: "test",
      },
    ]);
  });
});
