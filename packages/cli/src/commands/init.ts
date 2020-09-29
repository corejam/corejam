import { envRoot } from "../config";
import chalk from "chalk";
import ora from "ora";
import { collectPlugins } from '@corejam/base/dist/Bootstrap';

export async function corejamInit(_opts?: any) {
    const envPackageName = require(envRoot + "/package.json").name;
    const bootSpinner = ora(`Initializing Corejam App for ${chalk.bold.green(envPackageName)}...`).start();

    //Root packages
    collectPluginsRecurse(collectPlugins())

    bootSpinner.text = "Done"
    bootSpinner.stopAndPersist();
}

function collectPluginsRecurse(plugins: Array<string>) {
    return plugins.forEach(plugin => {
        collectPluginsRecurse(collectPlugins(plugin))
        console.log(plugin)
    })
}