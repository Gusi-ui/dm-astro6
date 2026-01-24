# Solución: Estilos no cargan en páginas de blog en producción

## Problema identificado

Las páginas de artículos individuales del blog no cargaban los estilos en producción (Cloudflare Pages), aunque funcionaban correctamente en local. Esto se debía a que:

1. **CSS dividido**: Astro estaba generando múltiples archivos CSS y las páginas pre-renderizadas solo referenciaban un archivo pequeño con animaciones, sin incluir los estilos de Tailwind.

2. **Páginas pre-renderizadas**: Las páginas de blog tienen `export const prerender = true;` para optimizar el rendimiento, pero esto causaba que no se incluyeran todos los CSS necesarios.

## Soluciones aplicadas

### 1. Configuración de Vite para CSS unificado

Se modificó `astro.config.mjs` para forzar que todos los estilos de Tailwind se generen en un solo archivo CSS:

```javascript
vite: {
  build: {
    cssCodeSplit: false, // No dividir el CSS en múltiples archivos
    rollupOptions: {
      output: {
        assetFileNames: '_astro/[name].[hash][extname]',
      },
    },
  },
  // ... resto de configuración
}
```

### 2. Configuración de build optimizada

```javascript
build: {
  inlineStylesheets: 'auto', // Permitir que Astro decida cuándo inline CSS
  assets: '_astro',
},
```

### 3. Configuración mejorada de Tailwind

Se actualizó `tailwind.config.mjs` para asegurar que las clases de `prose` se generen correctamente:

```javascript
safelist: [
  'prose',
  'prose-lg',
  'prose-headings:font-bold',
  'prose-headings:text-gray-900',
  'prose-p:text-gray-600',
  'prose-a:text-primary-600',
  'hover:prose-a:text-primary-700',
  'prose-img:rounded-xl',
  {
    pattern: /^prose(-\w+)?$/,
    variants: ['lg', 'xl', '2xl'],
  },
],
```

### 4. Estilos críticos inline como fallback

Se añadieron estilos críticos inline en `BaseLayout.astro` para asegurar que las clases `prose` funcionen incluso si hay problemas con el CSS externo.

## Resultado

Ahora el build genera:

- **Un solo archivo CSS** (`style.[hash].css`) de ~225KB con todos los estilos de Tailwind
- **Referencias correctas** en todas las páginas pre-renderizadas
- **Estilos inline críticos** como fallback para asegurar la visualización básica

## Verificación

Para verificar que los cambios funcionan correctamente:

1. **Compilar el proyecto**:

   ```bash
   pnpm build
   ```

2. **Verificar que existe un solo archivo CSS grande**:

   ```bash
   ls -lh dist/_astro/*.css
   # Debería mostrar: style.[hash].css (~225KB)
   ```

3. **Verificar que las páginas de blog referencian el CSS**:

   ```bash
   grep -o '<link[^>]*\.css[^>]*>' dist/blog/*/index.html
   # Debería mostrar: <link rel="stylesheet" href="/_astro/style.[hash].css">
   ```

4. **Verificar que el CSS contiene las clases necesarias**:
   ```bash
   grep -c "prose\|bg-white\|text-primary" dist/_astro/style.*.css
   # Debería mostrar números altos (cientos de ocurrencias)
   ```

## Despliegue a producción

Después de verificar localmente, desplegar a Cloudflare Pages:

```bash
pnpm run deploy:pages
```

O hacer push a tu repositorio si tienes CI/CD configurado:

```bash
git add .
git commit -m "Fix: Corregir carga de estilos en páginas de blog"
git push origin main
```

## Notas importantes

- Las páginas de blog siguen siendo pre-renderizadas para mejor rendimiento
- El archivo CSS es compartido por todas las páginas, mejorando el cacheo
- Los estilos inline críticos aseguran que el contenido sea legible incluso durante la carga
- La configuración `cssCodeSplit: false` es crucial para evitar la división del CSS

## Archivos modificados

1. `astro.config.mjs` - Configuración de build y Vite
2. `tailwind.config.mjs` - Safelist de clases prose
3. `src/layouts/BaseLayout.astro` - Estilos críticos inline
