import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwind from '@astrojs/tailwind';
import path from 'path';
import { fileURLToPath } from 'url';
import { remarkCloudinaryImages } from './src/lib/remark-cloudinary-images.ts';
import { rehypeCloudinaryImages } from './src/lib/rehype-cloudinary-images.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    imageService: 'compile',
    prerenderEnvironment: 'node',
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
  markdown: {
    remarkPlugins: [remarkCloudinaryImages],
    rehypePlugins: [rehypeCloudinaryImages],
  },
  build: {
    inlineStylesheets: 'auto',
    assets: '_astro',
  },
  vite: {
    optimizeDeps: {
      exclude: ['astro/zod'],
    },
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
