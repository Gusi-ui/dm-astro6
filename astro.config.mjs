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
    // Categoría renombrada y direcciones que Google aún conserva
    '/blog/categoria/activitats': { status: 301, destination: '/blog/categoria/actividades' },
    '/politica-privacidad': { status: 301, destination: '/privacidad' },
    // Artículos de la web antigua (WordPress, colgaban de la raíz)
    '/denuncias-anonimas-de-accesibilidad': {
      status: 301,
      destination: '/blog/denuncias-anonimas-de-accesibilidad',
    },
    '/discapacidad-hola-mundo': { status: 301, destination: '/blog/discapacidad-hola-mundo' },
    '/hola-mundo': { status: 301, destination: '/blog/discapacidad-hola-mundo' },
    '/el-dia-de-sant-jordi-en-mataro-tradiciones-cultura-y-celebracion': {
      status: 301,
      destination: '/blog/sant-jordi-mataro',
    },
    '/estacions-de-renfe': { status: 301, destination: '/ca/blog/estacions-de-renfe' },
    '/injusticias-del-dia-dia': { status: 301, destination: '/blog/injusticias-del-dia-dia' },
    '/injusticias-y-problematica-cotidiana': {
      status: 301,
      destination: '/blog/injusticias-del-dia-dia',
    },
    '/concentracion-dia-5-julio': { status: 301, destination: '/blog/injusticias-del-dia-dia' },
    '/la-crispela': { status: 301, destination: '/ca/blog/la-crispeta' },
    '/la-vida-independiente': { status: 301, destination: '/blog/la-vida-independiente' },
    '/mataro-connecta': { status: 301, destination: '/ca/blog/mataro-connecta' },
    '/moventis-y-divermataro': { status: 301, destination: '/blog/moventis-divermataro' },
    '/opiniones-gratuitas': { status: 301, destination: '/blog/opiniones-gratuitas' },
    '/opinion-sin-informacion': { status: 301, destination: '/blog/opiniones-gratuitas' },
    '/paseo-por-mataro-con-los-regidores': {
      status: 301,
      destination: '/blog/paseo-por-mataro-con-los-regidores',
    },
    '/todos-con-sexualidad': { status: 301, destination: '/blog/todos-con-sexualidad' },
    '/trampas': { status: 301, destination: '/blog/trampas' },
    '/transporte-publico-adaptado': {
      status: 301,
      destination: '/blog/transporte-publico-adaptado',
    },
    '/un-cambio-de-miradas': { status: 301, destination: '/blog/un-cambio-de-miradas' },
    '/viviendas-para-pmr': { status: 301, destination: '/blog/viviendas-pmr' },
    // Páginas y archivos de la web antigua
    '/quienes-somos': { status: 301, destination: '/asociacion' },
    '/accesibilidad-universal-quienes-somos': { status: 301, destination: '/asociacion' },
    '/asamblea-divermataro': { status: 301, destination: '/asociacion' },
    '/asamblea-extraordinaria-divermataro': { status: 301, destination: '/asociacion' },
    '/inscribete-en-la-asamblea': { status: 301, destination: '/asociate' },
    '/proyecto-amigos': { status: 301, destination: '/asociate' },
    '/publica-en-divermataro': { status: 301, destination: '/contacto' },
    '/accesibilidad-en-mataro': { status: 301, destination: '/blog/categoria/accesibilidad' },
    '/mapa-de-accesibilidad-en-mataro': {
      status: 301,
      destination: '/blog/categoria/accesibilidad',
    },
    '/historias': { status: 301, destination: '/blog' },
    '/category/denuncias': { status: 301, destination: '/blog/categoria/denuncia' },
    '/category/actividades': { status: 301, destination: '/blog/categoria/actividades' },
    '/category/event0s': { status: 301, destination: '/blog/categoria/eventos' },
    '/category/sociedad': { status: 301, destination: '/blog/categoria/social' },
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
