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
  integrations: [
    tailwind({
      applyBaseStyles: true,
    }),
  ],
  site: 'https://divermataro.org',
  build: {
    inlineStylesheets: 'auto',
    assets: '_astro',
  },
  vite: {
    build: {
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          assetFileNames: '_astro/[name].[hash][extname]',
        },
      },
    },
    resolve: {
      alias: {
        child_process: path.resolve(__dirname, 'src/lib/node-mock.mjs'),
        'node:child_process': path.resolve(__dirname, 'src/lib/node-mock.mjs'),
      },
    },
    ssr: {
      external: [
        'node:fs',
        'node:path',
        'node:os',
        'node:crypto',
        'node:stream',
        'node:events',
        'node:util',
        'fs',
        'path',
        'os',
        'crypto',
        'stream',
        'events',
        'util',
        'sharp',
      ],
    },
  },
});
