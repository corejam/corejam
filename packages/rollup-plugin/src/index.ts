import replace from "@rollup/plugin-replace";
import dotenv from "dotenv";
import { writeConfig } from "./generateConfig";
export { extractRoutes } from "./extractRoutes";

export default function corejam() {
  const envVars = dotenv.config();
  const replacedVars = {};

  for (const k in envVars.parsed) {
    replacedVars[k] = JSON.stringify(envVars[k]);
  }
  return {
    ...replace({
      preventAssignment: true,
      ...replacedVars,
    }),
    async buildStart() {
      const config = writeConfig();
      this.emitFile({
        type: "asset",
        name: "string",
        fileName: "config.json",
        source: JSON.stringify(config),
      });
    },
    name: "corejam",
  };
}
