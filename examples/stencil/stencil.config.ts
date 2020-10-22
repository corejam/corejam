import { Config } from '@stencil/core';
import { env } from '@alepop/stencil-env';
import { nodeResolve } from '@rollup/plugin-node-resolve';

// https://stenciljs.com/docs/config

export const config: Config = {
  taskQueue: 'async',
  devServer: {
    port: 3001,
  },
  rollupPlugins: {
    after: [nodeResolve()],
  },
  outputTargets: [
    {
      type: 'www',
      prerenderConfig: 'prerender.config.ts',
      empty: true,
      serviceWorker: null, // disable service worker
      baseUrl: 'http://localhost:3001',
    },
  ],
  plugins: [env()],
};
