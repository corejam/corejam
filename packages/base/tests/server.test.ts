import { CorejamServer } from "../src/Server"
import { createServerClient } from "../src/client/ServerClient"
import { testClient } from "../src/TestClient"
import { gql } from "apollo-server-micro";

describe("Server", () => {
  it("CorejamServer boots correctly", async () => {

    jest.mock(process.cwd() + "/.corejam/manifest.json", () => ({
      plugins: []
    }), { virtual: true })

    const corejamServer = await CorejamServer()

    expect(corejamServer.requestOptions).toHaveProperty("cache")
    expect(corejamServer.requestOptions).toHaveProperty("persistedQueries")

    const schemaTypes = await corejamServer.executeOperation({ query: "{__schema { types{name}}}" })
    expect(schemaTypes.data?.__schema.types).toContainEqual({ name: "Timestamp" })
    expect(schemaTypes.data?.__schema.types).toContainEqual({ name: "Paginated" })
  });

  it("ServerClient resolves query", async () => {
    const serverClient = createServerClient()

    const schemaTypes = await serverClient.query({ query: gql("{__schema { types{name}}}") })
    expect(schemaTypes.data?.__schema.types).toContainEqual({ name: "Timestamp" })
    expect(schemaTypes.data?.__schema.types).toContainEqual({ name: "Paginated" })
  });

  it("TestClient actually uses our mocked server instance", async () => {
    const client = await testClient()
    const { query } = client;

    const test = await query({ query: gql("{__schema { types{name}}}") })
    
    expect(test.data?.__schema.types).toContainEqual({ name: "Timestamp" })
    expect(test.data?.__schema.types).toContainEqual({ name: "Paginated" })  });
});