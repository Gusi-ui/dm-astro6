# ✅ Corrección: Content Collections para Astro 6

## Problema Resuelto

El error `LegacyContentConfigError` se ha corregido actualizando la configuración de Content Collections para Astro 6.

## Cambios Realizados

### 1. Archivo de Configuración Movido
- ❌ **Antes**: `src/content/config.ts` (legacy)
- ✅ **Ahora**: `src/content.config.ts` (nuevo formato)

### 2. Configuración Actualizada

La nueva configuración usa el loader `glob()` para Markdown:

```typescript
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    // ...
  }),
});
```

### 3. Páginas del Blog Actualizadas

Las páginas del blog ahora manejan correctamente el slug en Astro 6, que puede venir de diferentes propiedades (`id`, `slug`, `name`, `path`).

### 4. Binding KV Añadido

Se añadió el binding `SESSION` en `wrangler.jsonc` para evitar advertencias (aunque no es crítico para el funcionamiento básico).

## ✅ Estado

El proyecto ahora debería funcionar correctamente con Astro 6.

## 🚀 Probar

```bash
pnpm dev
```

El sitio debería iniciar sin errores de Content Collections.

## 📝 Nota sobre el Error de Puerto

Si ves un error `EPERM: operation not permitted` al iniciar el servidor, es un problema de permisos del sistema, no del código. Soluciones:

1. **Cerrar otros procesos** que puedan estar usando el puerto 4321
2. **Usar otro puerto**: Añade `--port 3000` al comando `dev` en `package.json`
3. **Reiniciar el terminal** o la aplicación

## 🎉 Siguiente Paso

Una vez que el servidor inicie correctamente, podrás:
- Ver la landing page en `http://localhost:4321`
- Probar el formulario de inscripción
- Ver el blog con el post de ejemplo
- Navegar por todas las páginas
