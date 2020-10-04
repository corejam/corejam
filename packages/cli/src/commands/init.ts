import { collectPlugins, importPlugin, isAPlugin } from '@corejam/base';
import { IntrospectionResult } from '@corejam/base/dist/typings/Server';
import { makeExecutableSchema } from "@graphql-tools/schema";
import chalk from "chalk";
import * as fs from "fs";
import { execute, getIntrospectionQuery, parse } from "graphql";
import ora from "ora";
import path from 'path';
import { envRoot } from "../config";

type CollectedPluginType = {
    name: string,
    depth: number
}

const collectedPlugins: Array<CollectedPluginType> = []

export function corejamInit() {
    const envPackageName = require(envRoot + "/package.json").name;
    const bootSpinner = ora(`Initializing Corejam App for ${chalk.bold.green(envPackageName)}...`).start();

    //Root packages
    if (isAPlugin()) collectedPlugins.push({ name: process.cwd(), depth: 0 })

    const rootPlugins = collectPlugins();
    collectPluginsRecurse(rootPlugins)

    const sorted = collectedPlugins.sort((a, b) => (a.depth < b.depth) ? 1 : ((b.depth < a.depth) ? -1 : 0))

    const plugins: Array<string> = [];
    sorted.map(item => {
        plugins.push(item.name)
    })

    fs.writeFileSync(getCacheDir() + "/manifest.json", JSON.stringify({ "plugins": plugins }));

    bootSpinner.text = "Merging application schemas";
    generateSchema(plugins)

    bootSpinner.text = "Done"
    bootSpinner.stopAndPersist();
}

let currentDepth = 0;

/**
 * Collect all plugins recursively.
 * 
 * @param plugins 
 */
function collectPluginsRecurse(plugins: Array<string>) {
    currentDepth++;

    plugins.forEach(plugin => {
        //We have a new plugin
        if (!collectedPlugins.filter(filterPlugin => filterPlugin.name === plugin)[0]) {
            const newPlugin = { name: plugin, depth: currentDepth }
            collectedPlugins.push(newPlugin);
            collectPluginsRecurse(collectPlugins(plugin))
        }

        collectedPlugins.map(value => {
            if (value.name === plugin && value.depth < currentDepth) {
                value.depth = currentDepth;
                return value
            }
            return
        })
    })
    currentDepth--;
}

async function generateSchema(plugins: Array<string>) {
    const corePath = require.resolve("@corejam/base/utils/core.graphql");
    let mergedSchemas = fs.readFileSync(corePath, "utf-8");

    for (const plugin of plugins) {
        const isLocalPlugin = isAPlugin();
        const currentPlugin = await importPlugin(plugin);

        currentPlugin.default.schemas.forEach((schema: any) => {
            const schemaRootPath = isLocalPlugin
                ? plugin
                : require.resolve(plugin).replace("/dist/server/index.js", "").replace("/server/index.ts", "");

            let schemaPath = schemaRootPath + "/dist/schema/" + schema + ".graphql";
            if (process.env.NODE_ENV === "test") {
                schemaPath = schemaRootPath + "/server/schema/" + schema + ".graphql";
            }

            const schemaFile = require.resolve(schemaPath);
            mergedSchemas += fs.readFileSync(schemaFile, "utf-8");
        });
    }

    const introspection = (
        await execute({
            schema: makeExecutableSchema({ typeDefs: mergedSchemas }),
            document: parse(getIntrospectionQuery()),
        })
    ).data as IntrospectionResult;

    fs.writeFileSync(getCacheDir() + "/schema.json", JSON.stringify(introspection), "utf8");
}


/**
* Get the current cache dir, create it if needed
*/
export function getCacheDir(): string {
    const cacheDir = path.join(process.cwd(), ".corejam");

    if (!fs.existsSync(cacheDir)) {
        fs.mkdirSync(cacheDir);
    }

    return cacheDir;
}