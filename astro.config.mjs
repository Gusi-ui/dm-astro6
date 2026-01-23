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
    ssr: {
      external: ['node:util', 'node:stream', 'node:path', 'node:events', 'node:os', 'node:child_process', 'node:crypto', 'fs', 'child_process'],
    },
  },
});
