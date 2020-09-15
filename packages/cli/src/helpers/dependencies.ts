import { envRoot } from "../config";

export async function getDependencies() {
  const pluginPkg = require(envRoot + "/package.json");

  const filterDevDep = () => {
    if (pluginPkg.devDependencies)
      return Object.keys(pluginPkg.devDependencies).filter(
        (p) => p.indexOf("@corejam/") > -1 && p.indexOf("/base") < 0
      );
    return [];
  };

  const filterDep = () => {
    if (pluginPkg.dependencies)
      return Object.keys(pluginPkg.dependencies).filter((p) => p.indexOf("@corejam/") > -1 && p.indexOf("/base") < 0);
    return [];
  };

  return [...filterDevDep(), ...filterDep()];
}
