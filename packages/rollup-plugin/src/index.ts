import { writeConfig } from "./generateConfig";
export { extractRoutes } from "./extractRoutes";

export default function corejam() {
  return {
    name: "corejam",
    async buildStart() {
      const config = writeConfig();
      this.emitFile({
        type: "asset",
        name: "string",
        fileName: "config.json",
        source: JSON.stringify(config),
      });
    },
  };
}
