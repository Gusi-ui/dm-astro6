import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    // Si es true, en móvil la imagen hero se muestra completa (ancho total y alto
    // automático) sin recortar, manteniendo el encuadre recortado solo en escritorio.
    heroFullMobile: z.boolean().optional(),
    category: z.string().optional(),
  }),
});

export const collections = { blog };
