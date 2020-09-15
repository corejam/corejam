import jetpack from "fs-jetpack";
import { stencilRunner } from "../config";

export async function prependImports(deps: string[]) {
  await jetpack.removeAsync(stencilRunner + "/src/global.ts");
  let data = "";
  deps
    .filter((d) => d !== "@corejam/cli")
    .forEach((d: string) => (data += d.includes("corejam") ? `import "${d}"\n` : `import "${d}"`));

  await jetpack.writeAsync(stencilRunner + "/src/global.ts", data);
}
