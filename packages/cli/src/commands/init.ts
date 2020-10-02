import { envRoot } from "../config";
import chalk from "chalk";
import ora from "ora";
import { collectPlugins, getCacheDir, isAPlugin } from '@corejam/base/dist/Bootstrap';
import * as fs from "fs";

type CollectedPluginType = {
    name: string,
    depth: number
}

const collectedPlugins: Array<CollectedPluginType> = []

export function corejamInit(_opts?: any) {
    console.log(envRoot)
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