import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    imageService: 'compile',
    platformProxy: {
      enabled: true,
    },
  }),
  integrations: [tailwind()],
  site: 'https://tudominio.com', // Actualizar con tu dominio
  vite: {
    resolve: {
      alias: {
        "fs": "node:fs",
        "path": "node:path",
        "os": "node:os",
        "crypto": "node:crypto",
        "stream": "node:stream",
        "events": "node:events",
        "util": "node:util",
        "child_process": "node:child_process",
      },
    },
    ssr: {
      external: ['node:util', 'node:stream', 'node:path', 'node:events', 'node:os', 'node:child_process', 'node:crypto', 'node:fs', 'fs', 'child_process'],
      noExternal: ['sharp'],
    },
  },
});
