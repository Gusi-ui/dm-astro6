import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwind from '@astrojs/tailwind';
import { unified } from '@astrojs/markdown-remark';
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
  }),
  integrations: [
    tailwind({
      applyBaseStyles: true,
    }),
  ],
  site: 'https://divermataro.org',
  // Artículos escritos en catalán que estaban en el blog castellano: ahora viven en
  // /ca/blog, y el blog castellano tiene su traducción con otra dirección
  redirects: {
    '/blog/la-crispeta': { status: 301, destination: '/ca/blog/la-crispeta' },
    '/blog/mataro-connecta': { status: 301, destination: '/ca/blog/mataro-connecta' },
    '/blog/estacions-de-renfe': { status: 301, destination: '/ca/blog/estacions-de-renfe' },
  },
  markdown: {
    processor: unified({
      remarkPlugins: [remarkCloudinaryImages],
      rehypePlugins: [rehypeCloudinaryImages],
    }),
  },
  build: {
    // blog/x.html en lugar de blog/x/index.html: Cloudflare la sirve en /blog/x,
    // que es la forma de todos los enlaces, sin redirigir a /blog/x/
    format: 'file',
    inlineStylesheets: 'auto',
    assets: '_astro',
  },
  vite: {
    optimizeDeps: {
      exclude: ['astro/zod'],
    },
    build: {
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
