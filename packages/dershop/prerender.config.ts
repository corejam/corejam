import { extractRoutes } from "@corejam/rollup-plugin";
import { PrerenderConfig } from "@stencil/core";

export const config: PrerenderConfig = {
  entryUrls: extractRoutes(__dirname).map((r) => {
    if (r.exact) {
      return r.url;
    }
    const tmp = r.url.split("/");
    tmp[tmp.length - 1] = "1";
    return tmp.join("/");
  }),
};
