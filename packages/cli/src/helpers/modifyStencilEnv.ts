import jetpack from "fs-jetpack";
import { stencilRunner } from "../config";

export async function deleteDevFiles() {
  await jetpack.removeAsync(stencilRunner + "/src/App.tsx");
  await jetpack.removeAsync(stencilRunner + "/src/Router.tsx");
  await jetpack.removeAsync(stencilRunner + "/src/Welcome.tsx");
  await jetpack.removeAsync(stencilRunner + "/src/Playground.tsx");
  await jetpack.removeAsync(stencilRunner + "/src/StaticRouter.tsx");
  await jetpack.removeAsync(stencilRunner + "/src/Liveview.tsx");
}

export async function removePlaygroundFiles() {
  await jetpack.removeAsync(stencilRunner + "/src/Playground.tsx");
  await jetpack.removeAsync(stencilRunner + "/src/Router.tsx");
}

export async function removeStaticFiles() {
  await jetpack.removeAsync(stencilRunner + "/src/StaticRouter.tsx");
}
