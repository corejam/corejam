import { gql } from "apollo-server-micro";
import { EventEmitter } from "events";
import * as fs from "fs";
import { bootstrapSchema, importPlugin, loadManifest } from "./Bootstrap";
import nRequire from "./nativeRequire";
import { Resolvers } from "./resolvers";
import { models as fakerModels } from "./resolvers/db/faker";
import { models as faunaModels } from "./resolvers/db/fauna";
import { CorejamApplication } from "./typings/Application";
import { ServerContext } from "./typings/Server";

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
export function getServerContext({ req, res }): ServerContext {
  let context = { req, res, models: getServerModels(), eventEmitter };

  if (fs.existsSync(process.cwd() + "/resolvers.js")) {
    const pluginsFile = require(process.cwd() + "/resolvers.js") as any;
    const serverKeys = Object.keys(pluginsFile.server);
    for (const p of serverKeys) {
      const res = pluginsFile.server[p].getPluginContext({ req, models: context.models, eventEmitter });
      context = { ...context, ...res };
    }
    return context;
  } else {
    //We need to merge all plugin context for any additional context items they add
    //TODO needs to get generated from cli for all the requires on plugins
    for (const plugin of loadManifest().plugins) {
      const currentPlugin = importPlugin(plugin) as any;
      const res = currentPlugin.getPluginContext({ req, models: context.models, eventEmitter });
      context = { ...context, ...res };

      if (currentPlugin.listens) {
        //Trigger listeners
        currentPlugin.listens.forEach((event) => {
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
export function CorejamServer(context = ({ req, res }) => getServerContext({ req, res })) {
  let resolvers = Object.values(Resolvers);

  if (fs.existsSync(process.cwd() + "/resolvers.js")) {
    const pluginsFile = require(process.cwd() + "/resolvers.js") as any;
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
      const currentPlugin = importPlugin(plugin) as CorejamApplication;

      if (currentPlugin.resolvers) {
        resolvers = {
          ...resolvers,
          ...currentPlugin.resolvers,
        };
      }
    }
  }

  /**
   * If any of the incoming applications have an init, lets call it
   */
  if (fs.existsSync(process.cwd() + "/inits.js")) {
    const pluginsFile = require(process.cwd() + "/inits.js") as any;
    Object.keys(pluginsFile.server).map((p) => {
      if (pluginsFile.server[p].default.init) {
        pluginsFile.server[p].default.init();
      }
    });
  } else {
    //We need to merge all plugin resolvers into our core
    for (const plugin of loadManifest().plugins) {
      const currentPlugin = importPlugin(plugin) as any;

      if (currentPlugin.init) {
        currentPlugin.init();
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

  return {
    typeDefs: gql(bootstrapSchema()),
    resolvers,
    context,
  };
}
