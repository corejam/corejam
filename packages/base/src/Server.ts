import { ApolloServer, gql } from "apollo-server-micro";
import { bootstrapSchema, importPlugin, loadManifest } from "./Bootstrap";
import { Resolvers } from "./resolvers";
import { ServerContext } from "./typings/Server";
import { models as faunaModels } from "./resolvers/db/fauna";
import { models as fakerModels } from "./resolvers/db/faker";
import { EventEmitter } from "events";
import * as fs from "fs";
import nRequire from "./nativeRequire";
import { InMemoryLRUCache } from "apollo-server-caching";

export const eventEmitter: EventEmitter = new EventEmitter();
const eventFiles: Array<string> = [];
const registerdPluginEvents: Array<string> = [];

process.on("unhandledRejection", (error: Error, p) => {
  console.log("Unhandled Rejection at: Promise", p, "error:", error);
  console.log(error);
});

/**
 * Return the appropriate resolvers based on environment setup.
 */
export const getServerModels = () => {
  let models;

  if (process.env.DB_DRIVER === "DB_FAUNA") {
    models = faunaModels;
  } else {
    models = fakerModels;
  }

  return models;
};

/**
 * We only have this extracted to allow us to bootstrap
 * the context within our integration tests.
 */
export async function getServerContext({ req, res }): Promise<ServerContext> {
  let context = { req, res, models: getServerModels(), eventEmitter };

  if (fs.existsSync(process.cwd() + "/resolvers.js")) {
    const pluginsFile = await import(process.cwd() + "/resolvers.js");
    const serverKeys = Object.keys(pluginsFile.server);
    for (const p of serverKeys) {
      const res = await pluginsFile.server[p].getPluginContext({ req, models: context.models, eventEmitter });
      context = { ...context, ...res };
    }
    return context;
  } else {
    //We need to merge all plugin context for any additional context items they add
    //TODO needs to get generated from cli for all the requires on plugins
    for (const plugin of loadManifest().plugins) {
      const currentPlugin = await importPlugin(plugin);
      const res = await currentPlugin.getPluginContext({ req, models: context.models, eventEmitter });
      context = { ...context, ...res };

      if (currentPlugin.default.listens) {
        //Trigger listeners
        currentPlugin.default.listens.forEach((event) => {
          if (!registerdPluginEvents.includes(event.event)) {
            registerdPluginEvents.push(event.event);
            eventEmitter.on(event.event, event.callback);
          }
        });
      }
    }

    return context;
  }
}

/**
 * Bootstrap the ApolloServer with our relevant schemas / context & models.
 * Merge all the plugins.
 *
 * @param context
 */
export async function CorejamServer(context = ({ req, res }) => getServerContext({ req, res })): Promise<ApolloServer> {
  let resolvers = Object.values(Resolvers);

  if (fs.existsSync(process.cwd() + "/resolvers.js")) {
    const pluginsFile = await import(process.cwd() + "/resolvers.js");
    Object.keys(pluginsFile.server).map((p) => {
      if (pluginsFile.server[p].default.resolvers) {
        resolvers = Object.values({
          ...resolvers,
          ...pluginsFile.server[p].default.resolvers,
        });
      }
    });
  } else {
    //We need to merge all plugin resolvers into our core
    for (const plugin of loadManifest().plugins) {
      const currentPlugin = await importPlugin(plugin);

      if (currentPlugin.default.resolvers) {
        resolvers = Object.values({
          ...resolvers,
          ...currentPlugin.default.resolvers,
        });
      }
    }
  }

  //Do we have any events inside the /events dir?
  if (fs.existsSync(process.cwd() + "/events")) {
    try {
      fs.readdirSync(process.cwd() + "/events").forEach((file) => {
        if (!eventFiles.includes(file)) {
          eventFiles.push(file);
          const s = nRequire(process.cwd() + "/events/" + file);
          eventEmitter.on(file.replace(".js", ""), s);
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  return new ApolloServer({
    typeDefs: gql(await bootstrapSchema()),
    resolvers,
    context,
    cache: new InMemoryLRUCache(),
  });
}
