import { writeConfig } from "./generateConfig";

export default function corejam() {
  return {
    name: "corejam",
    async buildStart() {
      const config = await writeConfig();

      this.emitFile({
        type: "asset",
        name: "string",
        fileName: "config.json",
        source: JSON.stringify(config),
      });
    },
  };
}
