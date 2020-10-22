import { PrerenderConfig } from '@stencil/core';

export const config: PrerenderConfig = {
  entryUrls: ['/', '/login', '/register', '/admin/users', 'admin/orders'],

  hydrateOptions() {
    return {
      runtimeLogging: true,
    };
  },
};
