import kleur from "kleur";
import path from "path";
import ora from "ora";
import logSymbol from "log-symbols";
import replace from "replace-in-file";
import { isYarn } from "is-npm";
import jetpack from "fs-jetpack";
import execa from "execa";
import { cliRoot, mono } from "../config";

export default async function createApp(name: string) {
  return new Promise(async (res: any) => {
    const spinner = ora(`Creating new Corejam application: ${name}`).start();
    const pluginRootPath = (mono ? process.env.INIT_CWD : process.cwd()) + "/" + name;

    spinner.text = "Copy templates";

    await jetpack.copyAsync(path.resolve(cliRoot, "dist", "templates", "plugin"), pluginRootPath);

    const installProcess = execa(isYarn ? "yarn" : "npm", ["install"], { cwd: pluginRootPath });

    await jetpack.renameAsync(pluginRootPath + "/gitignore", ".gitignore");

    spinner.stopAndPersist({ text: "Templates finished", symbol: logSymbol.success });
    // Replace all placeholder
    spinner.start("Putting all stuff in place");

    //@ts-ignore
    await replace({
      files: pluginRootPath + "/**/*",
      from: /pluginName/g,
      to: name,
    });
    //@ts-ignore
    await replace({
      files: pluginRootPath + "/**/*",
      from: /PluginName/g,
      to: name.charAt(0).toUpperCase() + name.slice(1),
    });

    spinner.stopAndPersist({ text: "Copy finished", symbol: logSymbol.success });
    // Rename placeholder files
    spinner.start("Moving words around");

    await jetpack.renameAsync(pluginRootPath + "/server/resolvers/db/faker/pluginName.ts", name + ".ts");
    await jetpack.renameAsync(pluginRootPath + "/server/resolvers/pluginName.ts", name + ".ts");
    await jetpack.renameAsync(pluginRootPath + "/server/schema/pluginName.graphql", name + ".graphql");
    await jetpack.renameAsync(pluginRootPath + "/server/types/pluginName.ts", name + ".ts");
    await jetpack.renameAsync(pluginRootPath + "/app/components/pluginName", name);
    await jetpack.renameAsync(pluginRootPath + "/app/components/" + name + "/pluginName.tsx", name + ".tsx");
    await jetpack.removeAsync(pluginRootPath + "/app/pluginName");
    await jetpack.renameAsync(pluginRootPath + "/app/store/pluginName.ts", name + ".ts");
    await jetpack.renameAsync(pluginRootPath + "/shared/pluginName.ts", name + ".ts");

    spinner.stopAndPersist({ text: "Renaming finished", symbol: logSymbol.success });

    spinner.start("Installing all dependencies");

    installProcess.on("exit", async () => {
      spinner.stopAndPersist({ text: "Dependencies installed", symbol: logSymbol.success });
      spinner.succeed(kleur.green("Everything is ready to go"));
      console.log();
      console.log();
      console.log(`Bootstrap of ${name} is finished.`);
      console.log();
      console.log(`We suggest: `);
      console.log();
      console.log(`${kleur.bold("cd into " + kleur.bold(kleur.red(name)))}`);
      console.log();
      console.log("and");
      console.log();
      console.log(`${kleur.green(isYarn ? "yarn build" : "npm run build")}`);
      console.log();
      console.log("then");
      console.log();
      console.log(`${kleur.green(isYarn ? "yarn dev" : "npm run dev")}`);
    });
    res();
  });
}
