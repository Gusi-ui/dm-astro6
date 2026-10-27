import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const postSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  heroImage: z.string().optional(),
  // Si es true, en móvil la imagen hero se muestra completa (ancho total y alto
  // automático) sin recortar, manteniendo el encuadre recortado solo en escritorio.
  heroFullMobile: z.boolean().optional(),
  category: z.string().optional(),
  // Idioma del artículo, solo si no es el de su blog: marca con lang el título,
  // la entradilla y el cuerpo para que los lectores de pantalla lo pronuncien bien.
  lang: z.enum(['es', 'ca']).optional(),
});

// Blog en castellano (/blog)
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: postSchema,
});

// Blog en catalán (/ca/blog). esSlug enlaza cada artículo con su versión en
// castellano (para el selector de idioma y los hreflang).
const blogCa = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content-ca/blog' }),
  schema: postSchema.extend({ esSlug: z.string().optional() }),
});

export const collections = { blog, blogCa };
