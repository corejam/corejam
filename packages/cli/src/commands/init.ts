import { envRoot } from "../config";
import chalk from "chalk";
import ora from "ora";
import { collectPlugins, getCacheDir } from '@corejam/base/dist/Bootstrap';
import * as fs from "fs";

const collectedPlugins: Array<string> = []

export function corejamInit(_opts?: any) {
    const envPackageName = require(envRoot + "/package.json").name;
    const bootSpinner = ora(`Initializing Corejam App for ${chalk.bold.green(envPackageName)}...`).start();

    //Root packages
    collectPluginsRecurse(collectPlugins())

    fs.writeFileSync(getCacheDir() + "/manifest.json", JSON.stringify({"plugins": collectedPlugins}));

    bootSpinner.text = "Done"
    bootSpinner.stopAndPersist();
}

/**
 * Collect all plugins recuresively.
 * 
 * TODO we need to actually order them properly.
 * @param plugins 
 */
function collectPluginsRecurse(plugins: Array<string>) {
    return plugins.forEach(plugin => {
        collectPluginsRecurse(collectPlugins(plugin))

        if(collectedPlugins.includes(plugin) === false) collectedPlugins.push(plugin);
    })
}