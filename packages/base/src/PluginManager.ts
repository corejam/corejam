import { DBProvider } from "./db/ProviderInterface";

const dataClients: Map<string, object> = new Map();

const dbProviders: Map<string, DBProvider> = new Map();

/**
 * Get a DB connection provided by one of the corejam DB packages.
 */
export function getDb(db?: string): DBProvider {
  if (!db) {
    if (!process.env.DB_DRIVER) {
      throw new Error("No database driver defined");
    }
    db = process.env.DB_DRIVER;
  }

  const dbProvider = dbProviders.get(db);

  if (!dbProvider) {
    throw new Error(`${db} is not registered yet. Missing DB package?`);
  }

  return dbProvider;
}

/**
 * This is the global registration point for DB packages.
 * Should be called during the package init.
 */
export function registerDBProvider(db: string, provider: DBProvider): DBProvider {
  dbProviders.set(db, provider);

  return provider;
}

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

  return client;
}

export enum DATACLIENTS {
  GRAPHQL = "graphql",
  FAUNA = "fauna",
}
