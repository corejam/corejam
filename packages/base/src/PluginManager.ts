const dataClients: Map<string, object> = new Map();

/**
 * Check if we have the data client already initialised and return it.
 * If we dont, callback is called which returns new client and pushes it onto stack.
 *
 * These are the data clients which are called on models.any() in plugins
 * so the server side resolver fetchers.
 *
 * @param identifier
 * @param initClient
 */
export function getDataClient(identifier: string, initClient: () => object, purge = false): object {
  let client = dataClients.get(identifier);

  if (!client || purge) {
    client = initClient();
    dataClients.set(identifier, client);
  }
  console.log(dataClients.entries.length)

  return client;
}

export enum DATACLIENTS {
  GRAPHQL = "graphql",
  FAUNA = "fauna",
}
