import { PrerenderConfig } from '@stencil/core';
//import { writeConfig } from "@corejam/rollup-plugin"

export const config: PrerenderConfig = {
    //entryUrls: writeConfig().router.routes.map(r => r.url)
    entryUrls: ["/account"]
};