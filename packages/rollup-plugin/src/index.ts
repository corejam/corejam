import replace from "@rollup/plugin-replace";
import dotenv from "dotenv";
import { writeConfig } from "./generateConfig";
export { extractRoutes } from "./extractRoutes";

export default function corejam() {
  const envVars = dotenv.config();
  const replacedVars = {};

  for (const k in envVars.parsed) {
    replacedVars[`process.env.${k}`] = JSON.stringify(envVars.parsed[k]);
  }
  return [
    replace({
      preventAssignment: true,
      values: replacedVars,
    }),
    {
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
    },
  ];
}
