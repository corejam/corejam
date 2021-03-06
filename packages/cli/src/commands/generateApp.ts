import execa from "execa";
import jetpack from "fs-jetpack";
import { isYarn } from "is-npm";
import kleur from "kleur";
import logSymbol from "log-symbols";
import ora from "ora";
import replace from "replace-in-file";
import { mono } from "../config";
import { packageJson } from "../helpers/package";
export default async function createApp(name: string) {
  return new Promise(async (res: any) => {
    name = name.toLowerCase();

    const spinner = ora(`Creating new Corejam application: ${name}`).start();
    const pluginRootPath = (mono ? process.env.INIT_CWD : process.cwd()) + "/" + name;

    if ((await jetpack.existsAsync(pluginRootPath)) != false) {
      spinner.warn(kleur.red("Directory already exists!"));
      return res();
    }

    spinner.text = "Bootstrapping app";

    await jetpack.copyAsync(__dirname + "/../templates/plugin", pluginRootPath);

    const json = packageJson(mono);

    await jetpack.writeAsync(pluginRootPath + "/package.json", json);

    const installProcess = execa(isYarn ? "yarn" : "npm", ["install"], { cwd: pluginRootPath });

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

    await jetpack.renameAsync(pluginRootPath + "/server/resolvers/db/faker/pluginName.ts", name + ".ts");
    await jetpack.renameAsync(pluginRootPath + "/server/resolvers/pluginName.ts", name + ".ts");
    await jetpack.renameAsync(pluginRootPath + "/server/schema/pluginName.graphql", name + ".graphql");
    await jetpack.renameAsync(pluginRootPath + "/shared/types/pluginName.ts", name + ".ts");
    await jetpack.renameAsync(pluginRootPath + "/app/components/pluginName", name);
    await jetpack.renameAsync(pluginRootPath + "/app/components/" + name + "/pluginName.tsx", name + ".tsx");
    await jetpack.removeAsync(pluginRootPath + "/app/pluginName");
    await jetpack.renameAsync(pluginRootPath + "/app/store/pluginName.ts", name + ".ts");
    await jetpack.renameAsync(pluginRootPath + "/shared/pluginName.ts", name + ".ts");

    spinner.text = "Installing all dependencies";

    installProcess.on("exit", async () => {
      spinner.stopAndPersist({ text: "Bootstrap finished.", symbol: logSymbol.success });
      spinner.succeed(kleur.green("Everything is ready to go"));
      console.log();
      console.log();
      console.log(`${kleur.bold("cd into " + kleur.bold(kleur.red(name)))}`);
      console.log();
      console.log();
      console.log("and then");
      console.log();
      console.log();
      console.log(`${kleur.green(isYarn ? "yarn dev" : "npm run dev")}`);
    });
    res();
  });
}
