import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwind from '@astrojs/tailwind';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
        "fs": path.resolve(__dirname, 'src/lib/node-mock.mjs'),
        "path": path.resolve(__dirname, 'src/lib/node-mock.mjs'),
        "os": path.resolve(__dirname, 'src/lib/node-mock.mjs'),
        "crypto": path.resolve(__dirname, 'src/lib/node-mock.mjs'),
        "stream": path.resolve(__dirname, 'src/lib/node-mock.mjs'),
        "events": path.resolve(__dirname, 'src/lib/node-mock.mjs'),
        "util": path.resolve(__dirname, 'src/lib/node-mock.mjs'),
        "child_process": path.resolve(__dirname, 'src/lib/node-mock.mjs'),
        "node:fs": path.resolve(__dirname, 'src/lib/node-mock.mjs'),
        "node:path": path.resolve(__dirname, 'src/lib/node-mock.mjs'),
        "node:os": path.resolve(__dirname, 'src/lib/node-mock.mjs'),
        "node:crypto": path.resolve(__dirname, 'src/lib/node-mock.mjs'),
        "node:stream": path.resolve(__dirname, 'src/lib/node-mock.mjs'),
        "node:events": path.resolve(__dirname, 'src/lib/node-mock.mjs'),
        "node:util": path.resolve(__dirname, 'src/lib/node-mock.mjs'),
        "node:child_process": path.resolve(__dirname, 'src/lib/node-mock.mjs'),
      },
    },
    ssr: {
      external: ['sharp'],
    },
  },
});
